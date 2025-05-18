import CurrencyInput, { type CurrencyInputOnChangeValues } from 'react-currency-input-field';

type Props = {
  onValueChange?: (value: string | undefined, name?: string, values?: CurrencyInputOnChangeValues) => void
  defaultValue?: number
}

export const BalanceInput = ({ onValueChange, defaultValue = 0 }: Props) => {
  return (
    <CurrencyInput
      id="balance"
      name="input-balance"
      placeholder="Enter amount"
      allowNegativeValue={false}
      defaultValue={defaultValue}
      decimalsLimit={2}
      onValueChange={onValueChange}
      prefix="EUR"
      groupSeparator="."
      decimalSeparator=","
      className="rounded h-[38px] border border-gray-300 pl-3 focus:outline-[#2684ff] placeholder:text-grey-600 w-full"
    />
  )
}