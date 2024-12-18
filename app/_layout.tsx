import { Link, Stack } from 'expo-router'
import { GluestackUIProvider } from './../components/ui/gluestack-ui-provider/index'
import '@/global.css'
import { Icon } from '@/components/ui/icon'
import { Heart, ShoppingCart, User } from 'lucide-react-native'
import { Pressable } from 'react-native'
import { useCart } from '@/store/cartStore'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/store/authStore'
import { HStack } from '@/components/ui/hstack'
import { useWishList } from '@/store/wishListStore'

const RootLayout = () => {
  const cartItemNum = useCart((state) => state.items.length)
  const wishListItemNum = useWishList((state) => state.items.length)
  const isLoggedIn = useAuth((s) => s.isAuthenticated)

  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          headerRight: () => (
            <HStack space='md'>
              {cartItemNum > 0 && (
                <Link href={'/cart'} asChild>
                  <Pressable className='flex-row gap-2'>
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemNum}</Text>
                  </Pressable>
                </Link>
              )}
              <Link href={'/wishList'} asChild>
                <Pressable className='flex-row '>
                  <Icon
                    as={Heart}
                    size='lg'
                    className='fill-pink-500 stroke-none'
                  />
                  <Text>{wishListItemNum}</Text>
                </Pressable>
              </Link>
            </HStack>
          )
        }}>
        <Stack.Screen
          name='index'
          options={{
            title: 'Shop',
            headerLeft: () =>
              !isLoggedIn && (
                <Link href={'/login'} asChild>
                  <Pressable className='flex-row gap-2 mr-5'>
                    <Icon as={User} />
                  </Pressable>
                </Link>
              )
          }}
        />
        <Stack.Screen name='product/[id]' options={{ title: 'Product' }} />
        <Stack.Screen name='(auth)/login' options={{ title: 'Log in' }} />
      </Stack>
    </GluestackUIProvider>
  )
}

export default RootLayout
