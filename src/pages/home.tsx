import { useEffect, useState, type ChangeEvent } from "react"
import { coinbaseApi } from "../config/axios"
import Select, { type OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated';
import { useNavigation, Form, useNavigate } from "react-router";

type FiatCurrency = {
  id: string;
  name: string;
  min_size: string;
}

type SelectOption = {
  value: string;
  label: string;
}

type CurrencyAPI = {
  currency: string;
  rates: { [key: string]: string };
}

const animatedComponents = makeAnimated();

export const Home = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState('');
  const [rates, setRates] = useState<Record<string, string>>()
  const [fiatCurrencies, setFiatCurrencies] = useState<SelectOption[]>([])
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>()

  const getFiatCurrencies = async () => {
    const response = await coinbaseApi.get(`/currencies`)
    const newFiatCurrencies: SelectOption[] = response?.data.data.map((currency: FiatCurrency) => ({ value: currency.id, label: currency.name }))
    setFiatCurrencies(newFiatCurrencies)
  }

  const getRates = async () => {
    const response = await coinbaseApi.get("/exchange-rates?currency=EUR")
    const data: CurrencyAPI = response?.data.data

    setRates(data.rates)
  }

  const onChange = (newValue: OnChangeValue<any, true>) => {
    const selectedValues = newValue.map(value => value.value)
    setSelectedCurrencies(selectedValues)
  }

  const onChangeBalance = (e: ChangeEvent<HTMLInputElement>) => {
    setBalance(e.target.value)
  }

  useEffect(() => {
    getFiatCurrencies()
    getRates()
  }, [])
  return (
    <>
      <input value={balance} onChange={onChangeBalance} type="number" step="0.01" required min="0.01" />
      <Select options={fiatCurrencies} isMulti components={animatedComponents} onChange={onChange} isDisabled={!balance} />

      <button onClick={() => navigate("/resultado")}>Convertir</button>
      {
        selectedCurrencies?.map(currency => {
          const rate = rates?.[currency] ?? "0"
          const exchangeValue = parseInt(balance) * parseInt(rate)

          return (
            <div key={currency} className="flex gap-5">
              <span>{currency}</span>
              <span>{exchangeValue}</span>
            </div>)
        })
      }
    </>
  )
}