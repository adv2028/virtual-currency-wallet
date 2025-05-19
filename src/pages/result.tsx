import { useStore } from '../stores/use-store'
import { formatCurrency } from '../utils/format-currency'
import { useLoaderData } from 'react-router'

export const Result = () => {
  const { rates } = useLoaderData()
  const balance = useStore((state) => state.balance) ?? 0
  const selectedCurrencies = useStore((state) => state.selectedCurrencies)
  const formattedBalance = formatCurrency({
    value: balance,
    currency: 'EUR',
    locale: 'es-ES',
    currencyDisplay: 'narrowSymbol',
  })

  const calculateExchangeValue = (currency: string) => {
    if (!rates) return

    const rate = parseFloat(rates[currency])
    const exchange = rate * balance

    return formatCurrency({
      value: exchange,
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const today = new Date()

  return (
    <section>
      <div className="mb-6 pb-4 border-b border-gray-200">
        <p className="text-lg text-gray-700 text-center">
          Conversión para:
          <span className="text-blue-600 font-bold"> EUR</span>
          <span className="font-semibold text-gray-900">
            {' '}
            {formattedBalance}
          </span>
        </p>
      </div>

      {selectedCurrencies.map((currency) => (
        <div
          key={currency.value}
          className="flex justify-between items-center border-b py-2 last:border-b-0 last:pb-0"
        >
          <p className="text-gray-700 font-medium">{currency.value}</p>
          <p className="text-xl font-bold text-green-600">
            {calculateExchangeValue(currency.value)}
          </p>
        </div>
      ))}

      <div className="mt-6 pt-4  border-gray-200 text-center text-sm text-gray-500">
        Last updated exchange rates:{' '}
        {Intl.DateTimeFormat('en', {
          day: '2-digit',
          dayPeriod: 'long',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        }).format(today)}
        .
      </div>
    </section>
  )
}
