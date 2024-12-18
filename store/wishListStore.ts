import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type TWishListItem = {
  product: any
}

interface WishListState {
  items: TWishListItem[]
  addProduct: (product: any) => void
  removeProduct: (productId: string) => void
  resetWishList: () => void
}

export const useWishList = create<WishListState>()(
  persist(
    (set) => ({
      items: [],
      addProduct: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.product.id === product.id
          )
          if (exists) {
            return state
          }

          return { items: [...state.items, { product }] }
        }),

      removeProduct: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId)
        })),

      resetWishList: () => set(() => ({ items: [] }))
    }),
    {
      name: 'wishList',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
