import React from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/products.json'
import { Card } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import { Button, ButtonText } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { useCart } from '@/store/cartStore'
import { useAuth } from '@/store/authStore'
import { Toast, ToastTitle, useToast } from '@/components/ui/toast'
import { Icon } from '@/components/ui/icon'
import { Check, ShoppingCart } from 'lucide-react-native'
import { Divider } from '@/components/ui/divider'

const ProductDetails = () => {
  const { id } = useLocalSearchParams()

  const addProduct = useCart((state) => state.addProduct)
  const isLoggedIn = useAuth((s) => s.isAuthenticated)
  const toast = useToast()

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return <Text>Product not found</Text>
  }

  const addToCart = () => {
    if (!isLoggedIn) {
      return <Redirect href={'/login'} />
    }

    toast.show({
      placement: 'top',
      render: ({ id }) => {
        const toastId = 'toast-' + id
        return (
          <Toast
            nativeID={toastId}
            className='px-5 py-3 gap-4 shadow-soft-1 items-center flex-row bg-success-500 text-white rounded-md'>
            <Icon
              as={ShoppingCart}
              size='xl'
              className='fill-white stroke-none'
            />
            <Divider
              orientation='vertical'
              className='h-[30px] bg-white opacity-50'
            />
            <ToastTitle size='sm' className='font-semibold'>
              Product added to cart
            </ToastTitle>
          </Toast>
        )
      }
    })

    addProduct(product)
  }

  return (
    <Box className='flex-1 items-center p3'>
      <Stack.Screen options={{ title: product.name }} />
      <Card className='p-5 rounded-lg max-w-[960px] w-full flex-1'>
        <Image
          source={{
            uri: product.image
          }}
          className='mb-6 h-[240px] w-full rounded-md aspect-[4/3]'
          alt={`${product.name}-image`}
          resizeMode='contain'
        />
        <Text className='text-sm font-normal mb-2 text-typography-700'>
          {product.name}
        </Text>
        <VStack className='mb-6'>
          <Heading size='md' className='mb-4'>
            ${product.price}
          </Heading>
          <Text size='sm'>{product.description}</Text>
        </VStack>
        <Box className='flex-col sm:flex-row'>
          <Button
            onPress={addToCart}
            className='px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1'>
            <ButtonText size='sm'>Add to cart</ButtonText>
          </Button>
          <Button
            variant='outline'
            className='px-4 py-2 border-outline-300 sm:flex-1'>
            <ButtonText size='sm' className='text-typography-600'>
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default ProductDetails
