import { useLoaderData, useNavigate } from 'react-router'
import { CurrencySelector } from '../components/currency-selector'
import { Button } from '../components/button'
import { BalanceInput } from '../components/balance-input'
import { useStore } from '../stores/use-store'
import { toast } from 'sonner'
import type { OnChangeValue } from 'react-select'
import type { CurrencyInputOnChangeValues } from 'react-currency-input-field'
import type { Option } from '../types/types'

export const Home = () => {
  const navigate = useNavigate()
  const { fiatCurrencies } = useLoaderData()

  const balance = useStore((state) => state.balance)
  const setBalance = useStore((state) => state.setBalance)

  const selectedCurrencies = useStore((state) => state.selectedCurrencies)
  const setSelectedCurrencies = useStore((state) => state.setSelectedCurrencies)

  const showToastMaxOptionsSelected = () => {
    toast.warning('You’ve selected the maximum of 3 allowed currencies.', {
      closeButton: true,
    })
  }

  const onChangeCurrencySelector = (value: OnChangeValue<Option, true>) => {
    const currentSelectedOptions = value || []
    if (currentSelectedOptions.length >= 3) showToastMaxOptionsSelected()
    const slicedValues = currentSelectedOptions.slice(0, 3)
    setSelectedCurrencies(slicedValues)
  }

  const onChangeBalance = (
    _value: string | undefined,
    _name?: string,
    values?: CurrencyInputOnChangeValues
  ) => {
    if (!values?.float) return
    setBalance(values?.float)
  }

  const onWatchResult = () => {
    navigate('/result')
  }

  return (
    <div className="flex flex-col gap-5 w-full px-6 items-center">
      <div className="lg:max-w-3xl flex flex-col gap-3 w-full">
        <BalanceInput onValueChange={onChangeBalance} defaultValue={balance} />
        <CurrencySelector
          placeholder="Select up to 3 currencies"
          currencies={fiatCurrencies}
          onChange={onChangeCurrencySelector}
          defaultValue={selectedCurrencies}
          value={selectedCurrencies}
        />
        <Button
          title="Show conversion"
          onClick={onWatchResult}
          disabled={
            selectedCurrencies.length < 1 || selectedCurrencies.length > 3
          }
        />
      </div>
    </div>
  )
}
