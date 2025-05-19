import { render, screen } from '@testing-library/react';
import { Option } from '../../src/types/types';
import { CurrencySelector } from '../../src/components/currency-selector';
import { MultiValue } from 'react-select';

const mockCurrencies: Option[] = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' },
  { value: 'GBP', label: 'British Pound' },
  { value: 'JPY', label: 'Japanese Yen' },
];

describe('CurrencySelector component', () => {
  it('renders with a placeholder', () => {
    const placeholderText = "Select currencies...";
    render(
      <CurrencySelector
        placeholder={placeholderText}
        currencies={mockCurrencies}
        value={[]}
        onChange={() => { }}
      />
    );

    expect(screen.getByText(placeholderText)).toBeInTheDocument();
  })

  it('renders with default values selected', () => {
    const defaultValue: MultiValue<Option> = [mockCurrencies[0], mockCurrencies[1]]; // USD, EUR

    render(
      <CurrencySelector
        currencies={mockCurrencies}
        defaultValue={defaultValue}
        value={defaultValue}
        onChange={() => {}}
      />
    );

    expect(screen.getByText(mockCurrencies[0].label)).toBeInTheDocument();
    expect(screen.getByText(mockCurrencies[1].label)).toBeInTheDocument();
  })
})