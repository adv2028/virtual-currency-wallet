type Props = {
  value: number
  currency?: string
  currencyDisplay?: keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry
  locale?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  options?: Intl.NumberFormatOptions
}
export const formatCurrency = ({
  value,
  currency,
  currencyDisplay,
  minimumFractionDigits,
  maximumFractionDigits,
  locale,
  options,
}: Props): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    currencyDisplay,
    minimumFractionDigits,
    maximumFractionDigits,
    ...options,
  }

  return new Intl.NumberFormat(locale, defaultOptions).format(value)
}
