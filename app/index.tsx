import { FlatList, Text } from 'react-native'
import React from 'react'
import products from '../assets/products.json'
import ProductListItem from '../components/ProductListItem'

const Home = () => {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerClassName='gap-2'
      columnWrapperClassName='gap-2'
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  )
}

export default Home
