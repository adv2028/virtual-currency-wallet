import { useStore } from "../stores/use-store";
import { formatCurrency } from "../utils/format-currency";
import { useLoaderData } from "react-router";

export const Result = () => {
  const { rates } = useLoaderData();
  const balance = useStore(state => state.balance)
  const selectedCurrencies = useStore(state => state.selectedCurrencies)
  const formattedBalance = formatCurrency({ value: balance, currency: "EUR", locale: "es-ES" })

  const calculateExchangeValue = (currency: string) => {
    if (!rates) return
    const rate = parseInt(rates[currency])
    const exchange = rate * balance

    return formatCurrency({ value: exchange, currency, options: { currencySign: "accounting" } })
  }

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