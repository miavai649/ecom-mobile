import { Link, Stack } from 'expo-router'
import { GluestackUIProvider } from './../components/ui/gluestack-ui-provider/index'
import '@/global.css'
import { Icon } from '@/components/ui/icon'
import { ShoppingCart } from 'lucide-react-native'
import { Pressable } from 'react-native'

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          headerRight: () => (
            <Link href={'/cart'} asChild>
              <Pressable>
                <Icon as={ShoppingCart} />
              </Pressable>
            </Link>
          )
        }}>
        <Stack.Screen name='index' options={{ title: 'Shop' }} />
        <Stack.Screen name='product/[id]' options={{ title: 'Product' }} />
      </Stack>
    </GluestackUIProvider>
  )
}

export default RootLayout
