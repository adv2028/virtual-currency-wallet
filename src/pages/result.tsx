import { useEffect, useState } from "react"
import { coinbaseApi } from "../config/axios"
import { useStore } from "../stores/use-store";
import { formatCurrency } from "../utils/format-currency";

type CurrencyAPI = {
  currency: string;
  rates: { [key: string]: string };
}

export const Result = () => {
  const [rates, setRates] = useState<Record<string, string>>()

  const balance = useStore(state => state.balance)
  const selectedCurrencies = useStore(state => state.selectedCurrencies)

  const formattedBalance = formatCurrency({ value: balance, currency: "EUR", locale: "es-ES" })

  const getRates = async () => {
    const response = await coinbaseApi.get("/exchange-rates?currency=EUR")
    const data: CurrencyAPI = response?.data.data

    setRates(data.rates)
  }

  const calculateExchangeValue = (currency: string) => {
    if (!rates) return
    const rate = parseInt(rates[currency])
    const exchange = rate * balance

    return formatCurrency({ value: exchange, currency, options: { currencySign: "accounting"} })
  }

  useEffect(() => {
    getRates()
  }, [])

  return (
    <section>
      <h2 className="text-center font-bold text-3xl pb-5 text-gray-800">{formattedBalance}</h2>

      {
        selectedCurrencies.map(currency => (
          <div key={currency.value} className="grid grid-cols-2 gap-5">
            <p className="text-gray-800 text-right">{calculateExchangeValue(currency.value)}</p>
            <p className="text-gray-500">({currency.label})</p>
          </div>
        ))
      }
    </section>
  )
}