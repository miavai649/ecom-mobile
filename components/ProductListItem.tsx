import React from 'react'
import { Card } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import { Button, ButtonText } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'

const ProductListItem = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className='flex-1'>
        <Card className='p-5 rounded-lg  max-w-[960px] '>
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
          <Heading size='md' className='mb-4'>
            ${product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  )
}

export default ProductListItem
