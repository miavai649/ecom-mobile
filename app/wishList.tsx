import { FlatList, Image } from 'react-native'
import React from 'react'
import { useWishList } from '@/store/wishListStore'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Trash, XCircle } from 'lucide-react-native'
import { Toast, ToastTitle, useToast } from '@/components/ui/toast'
import { Icon } from '@/components/ui/icon'
import { Divider } from '@/components/ui/divider'
import { Redirect, useRouter } from 'expo-router'

const wishList = () => {
  const items = useWishList((state) => state.items)
  const removeItemFromWishList = useWishList((state) => state.removeProduct)
  const clearWishList = useWishList((state) => state.resetWishList)
  const toast = useToast()
  const router = useRouter()

  const handleRemoveFromWishList = (productId: string) => {
    toast.show({
      placement: 'bottom',
      render: ({ id }) => {
        const toastId = 'toast-' + id
        return (
          <Toast
            nativeID={toastId}
            className='px-5 py-2 gap-4 shadow-soft-1 items-center flex-row bg-red-500 text-white rounded-md'>
            <Icon
              as={Trash}
              size={'sm'}
              color='#ffffff'
              className='fill-white stroke-none'
            />
            <Divider
              orientation='vertical'
              className='h-[30px] bg-white opacity-50'
            />
            <ToastTitle size='sm' className='font-semibold'>
              Item removed from wishlist
            </ToastTitle>
          </Toast>
        )
      }
    })

    removeItemFromWishList(productId)
  }

  if (items.length === 0) {
    return <Redirect href={'/'} />
  }

  const onClear = () => {
    toast.show({
      placement: 'bottom',
      render: ({ id }) => {
        const toastId = 'toast-' + id
        return (
          <Toast
            nativeID={toastId}
            className='px-5 py-2 gap-4 shadow-soft-1 items-center flex-row bg-warning-500 text-white rounded-md'>
            <Icon
              as={XCircle}
              size={'sm'}
              color='#ffffff'
              className='fill-white stroke-none'
            />
            <Divider
              orientation='vertical'
              className='h-[30px] bg-white opacity-50'
            />
            <ToastTitle size='sm' className='font-semibold'>
              Wishlist cleared!
            </ToastTitle>
          </Toast>
        )
      }
    })

    clearWishList()
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto px-5'
      renderItem={({ item }) => (
        <HStack
          className='bg-white p-4 rounded-lg shadow-lg items-center'
          style={{ width: '100%', maxWidth: 960 }}>
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
            <Text className='text-gray-600'>{item.product.price}</Text>
          </VStack>

          <Button
            size='xs'
            className='rounded-full bg-red-500 p-2'
            onPress={() => handleRemoveFromWishList(item.product.id)}>
            <ButtonIcon as={Trash} className='text-white' />
          </Button>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onClear}>
          <ButtonText>Clear</ButtonText>
        </Button>
      )}
    />
  )
}

export default wishList
