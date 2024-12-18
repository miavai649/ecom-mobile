import { Button, ButtonText } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { useAuth } from '@/store/authStore'
import { Redirect } from 'expo-router'
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'
import { useState } from 'react'

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const { login } = useAuth()

  const isLoggedIn = useAuth((s) => s.isAuthenticated)

  const handleSignIn = () => {
    if (!email || !password) {
      console.log('Email and password are required.')
      setIsValid(false)
      return
    }

    login(email, password)
    console.log('Login successful with email:', email)
  }

  if (isLoggedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <FormControl
      isInvalid={isValid}
      className='p-4 border rounded-lg max-w-[500px] mx-auto w-full border-outline-300 bg-white m-2'>
      <VStack space='xl'>
        <Heading className='text-typography-900'>Login</Heading>
        <VStack space='xs'>
          <Text className='text-typography-500'>Email</Text>
          <Input className='min-w-[250px]'>
            <InputField type='text' value={email} onChangeText={setEmail} />
          </Input>
        </VStack>
        <VStack space='xs'>
          <Text className='text-typography-500'>Password</Text>
          <Input className='text-center'>
            <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? 'text' : 'password'}
            />
            <InputSlot className='pr-3' onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space='sm'>
          <Button className='flex-1' onPress={handleSignIn}>
            <ButtonText>Sign in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  )
}
