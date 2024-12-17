import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/products.json'
import { Card } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import { Button, ButtonText } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { useCart } from '@/store/cartStore'

const ProductDetails = () => {
  const { id } = useLocalSearchParams()

  const addProduct = useCart((state) => state.addProduct)

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return <Text>Product not found</Text>
  }

  const addToCart = () => {
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
