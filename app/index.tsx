import { FlatList, Text } from 'react-native'
import React from 'react'
import products from '../assets/products.json'
import ProductListItem from '../components/ProductListItem'
import { Button, ButtonText } from '@/components/ui/button'

const Home = () => {
  return (
    // <FlatList
    //   data={products}
    //   renderItem={({ item }) => <ProductListItem item={item} />}
    // />
    <Button size='md' variant='outline' action='positive'>
      <ButtonText>Hello World!</ButtonText>
    </Button>
  )
}

export default Home
