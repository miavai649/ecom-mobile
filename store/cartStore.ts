import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type CartItem = {
  product: any
  quantity: number
}

interface CartState {
  items: CartItem[]
  addProduct: (product: any) => void
  resetCart: () => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addProduct: (product: any) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          }

          return {
            items: [...state.items, { product, quantity: 1 }]
          }
        }),

      resetCart: () => set({ items: [] }),

      increaseQuantity: (productId: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        })),

      decreaseQuantity: (productId: string) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId && item.quantity >= 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        }))
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
