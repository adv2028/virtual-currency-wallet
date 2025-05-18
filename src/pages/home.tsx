import { useEffect, useState } from "react"
import { coinbaseApi } from "../config/axios"
import { useNavigate } from "react-router";
import { CurrencySelector } from "../components/currency-selector";
import { Button } from "../components/button";
import { BalanceInput } from "../components/balance-input";
import type { OnChangeValue } from "react-select";
import type { CurrencyInputOnChangeValues } from 'react-currency-input-field';
import { useStore } from "../stores/use-store";
import { toast } from 'sonner';

type FiatCurrency = {
  id: string;
  name: string;
  min_size: string;
}

type Option = {
  value: string;
  label: string;
}

export const Home = () => {
  const navigate = useNavigate();
  const [fiatCurrencies, setFiatCurrencies] = useState<Option[]>([])

  const balance = useStore(state => state.balance)
  const setBalance = useStore(state => state.setBalance)

  const selectedCurrencies = useStore(state => state.selectedCurrencies)
  const setSelectedCurrencies = useStore(state => state.setSelectedCurrencies)

  const getFiatCurrencies = async () => {
    const response = await coinbaseApi.get(`/currencies`)
    const newFiatCurrencies: Option[] = response?.data.data.map((currency: FiatCurrency) => ({ value: currency.id, label: currency.name }))
    setFiatCurrencies(newFiatCurrencies)
  }

  const showToastMaxOptionsSelected = () => {
    toast.warning('You’ve selected the maximum of 3 allowed currencies.', {
      closeButton: true
    })
  }

  const onChangeCurrencySelector = (value: OnChangeValue<any, true>) => {
    if (value.length >= 3) showToastMaxOptionsSelected()
    const slicedValues = value.slice(0, 3);
    setSelectedCurrencies(slicedValues)
  }

  const onChangeBalance = (value: string | undefined, name?: string, values?: CurrencyInputOnChangeValues) => {
    if (!values?.float) return
    setBalance(values?.float)
  }

  const onWatchResult = () => {
    navigate("/resultado")
  }

  useEffect(() => {
    getFiatCurrencies()
  }, [])

  return (
    <div className="flex flex-col gap-5 w-full px-6">
      <BalanceInput onValueChange={onChangeBalance} defaultValue={balance} />
      <CurrencySelector placeholder="Select up to 3 currencies" currencies={fiatCurrencies} onChange={onChangeCurrencySelector} defaultValue={selectedCurrencies} value={selectedCurrencies} />
      <Button title="Show conversion" onClick={onWatchResult} disabled={selectedCurrencies.length < 1 || selectedCurrencies.length > 3} />
    </div>
  )
}