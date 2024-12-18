import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  user: string | null
  password: string | null
  isAuthenticated: boolean
  login: (user: string, password: string) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      password: null,
      isAuthenticated: false,
      login: (user: string, password: string) =>
        set({ user, password, isAuthenticated: true }),
      logout: () => set({ user: null, password: null, isAuthenticated: false })
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
