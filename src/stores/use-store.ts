import type { MultiValue } from 'react-select'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Option = {
  value: string
  label: string
}

type StoreState = {
  balance: number | null
  selectedCurrencies: MultiValue<Option>
}

type StoreActions = {
  setBalance: (newBalance: number | null) => void
  setSelectedCurrencies: (newCurrencies: MultiValue<Option>) => void
}

export const useStore = create<StoreState & StoreActions>()(
  devtools(
    persist(
      (set) => ({
        balance: null,
        selectedCurrencies: [],
        setBalance: (newBalance) => set(() => ({ balance: newBalance })),
        setSelectedCurrencies: (newCurrencies) =>
          set(() => ({ selectedCurrencies: newCurrencies })),
      }),
      { name: 'virtual-currency-wallet-store' }
    )
  )
)
