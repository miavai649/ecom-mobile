import { FlatList, Text } from 'react-native'
import React from 'react'
import products from '../assets/products.json'
import ProductListItem from '../components/ProductListItem'

const Home = () => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem item={item} />}
    />
  )
}

export default Home
