import { render, screen } from '@testing-library/react';
import { Button } from '../../src/components/button';

describe('Button component', () => {
  it('renders with the correct title', () => {
    const buttonTitle = 'Click Me';

    render(<Button title={buttonTitle} onClick={() => {}} />);

    const buttonElement = screen.getByRole('button', { name: buttonTitle });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonTitle);
  })
})