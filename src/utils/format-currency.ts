type Props = {
  value: number
  currency: string
  locale?: string
  options?: Intl.NumberFormatOptions
}
export const formatCurrency = ({
  value,
  currency,
  locale,
  options,
}: Props): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    ...options,
  }

  return new Intl.NumberFormat(locale, defaultOptions).format(value)
}
