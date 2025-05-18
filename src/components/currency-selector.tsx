import Select, { type MultiValue, type OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated';
import type { Option } from '../types/types';

type Props = {
  placeholder?: string,
  currencies: Option[],
  defaultValue?: MultiValue<Option>,
  value: MultiValue<Option>,
  onChange: (value: OnChangeValue<any, true>) => void
}

const animatedComponents = makeAnimated();

export const CurrencySelector = ({
  placeholder,
  currencies,
  defaultValue,
  value,
  onChange
}: Props) => {
  return (
    <Select placeholder={placeholder} options={currencies} isMulti components={animatedComponents} onChange={onChange} defaultValue={defaultValue} isOptionDisabled={() => value?.length >= 3} />
  )
}