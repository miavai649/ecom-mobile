import { View, Text } from 'react-native'
import React from 'react'

const ProductListItem = ({ item }) => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>{item.name}</Text>
    </View>
  )
}

export default ProductListItem
