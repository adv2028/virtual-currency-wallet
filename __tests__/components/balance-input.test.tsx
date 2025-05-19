import { render, screen } from '@testing-library/react';
import { BalanceInput } from '../../src/components/balance-input';

describe('BalanceInput component', () => {
  it('renders correctly with default props', () => {
    render(<BalanceInput />);

    const inputElement = screen.getByPlaceholderText('Enter amount');
    expect(inputElement).toBeInTheDocument();
  })
})