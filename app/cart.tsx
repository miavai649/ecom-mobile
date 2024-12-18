import { FlatList, Image } from 'react-native'
import React from 'react'
import { useCart } from '@/store/cartStore'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Redirect } from 'expo-router'
import {
  CheckCircle,
  MinusIcon,
  PlusIcon,
  ShieldCheck,
  Smile
} from 'lucide-react-native'
import { Toast, ToastTitle, useToast } from '@/components/ui/toast'
import { Icon } from '@/components/ui/icon'
import { Divider } from '@/components/ui/divider'

const cart = () => {
  const items = useCart((state) => state.items)
  const resetCart = useCart((state) => state.resetCart)
  const increaseQuantity = useCart((state) => state.increaseQuantity)
  const decreaseQuantity = useCart((state) => state.decreaseQuantity)

  const toast = useToast()

  const onCheckout = () => {
    toast.show({
      placement: 'bottom',
      render: ({ id }) => {
        const toastId = 'toast-' + id
        return (
          <Toast
            nativeID={toastId}
            className='px-5 py-2 gap-4 shadow-soft-1 items-center flex-row bg-success-500 text-white rounded-md'>
            <Icon
              as={ShieldCheck}
              size={'sm'}
              color='#ffffff'
              className='fill-white stroke-none'
            />
            <Divider
              orientation='vertical'
              className='h-[30px] bg-white opacity-50'
            />
            <ToastTitle size='sm' className='font-semibold'>
              Checkout successful!
            </ToastTitle>
          </Toast>
        )
      }
    })

    resetCart()
  }

  if (items.length === 0) {
    return <Redirect href={'/'} />
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto px-5'
      renderItem={({ item }) => (
        <HStack className='bg-white p-4 rounded-lg shadow-md items-center'>
          <Image
            source={{
              uri: item.product.image
            }}
            className='w-[70px] h-[70px] mr-5 rounded-full'
            alt={`${item.product.name} image`}
            resizeMode='cover'
          />
          <VStack space='sm' className='flex-1'>
            <Text bold className='text-lg text-gray-800'>
              {item.product.name}
            </Text>
            <Text className='text-gray-600'>${item.product.price}</Text>
          </VStack>
          <VStack space='sm' className='items-end'>
            <Text bold className='text-base text-gray-700'>
              Qty: {item.quantity}
            </Text>
            <HStack space='xs'>
              <Button
                size='xs'
                className='rounded-full bg-blue-500 p-2'
                onPress={() => increaseQuantity(item.product.id)}>
                <ButtonIcon as={PlusIcon} className='text-white' />
              </Button>
              <Button
                size='xs'
                className='rounded-full bg-red-500 p-2'
                onPress={() => decreaseQuantity(item.product.id)}>
                <ButtonIcon as={MinusIcon} className='text-white' />
              </Button>
            </HStack>
          </VStack>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  )
}

export default cart
