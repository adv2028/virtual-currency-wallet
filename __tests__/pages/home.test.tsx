import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLoaderData } from 'react-router';
import { toast } from 'sonner';
import { Home } from '../../src/pages/home';
import { useStore } from '../../src/stores/use-store';
import type { Option } from '../../src/types/types';
import { Mock } from 'vitest';

// Mock - react-router
const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router')>();
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useLoaderData: vi.fn(),
  };
});

// Mock - sonner
vi.mock('sonner', () => ({
  toast: {
    warning: vi.fn(),
  },
}));

// Mock - Coinbase API
vi.mock('../../src/config/axios', () => ({
  coinbaseApi: {
    get: vi.fn(),
  },
}));

// Mock - Zustand store
const originalState = useStore.getState();

const mockFiatCurrencies: Option[] = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' },
  { value: 'GBP', label: 'British Pound' },
  { value: 'JPY', label: 'Japanese Yen' },
];

// Helper to render Home
const renderHomePage = (loaderData: { fiatCurrencies: Option[] }) => {
  (useLoaderData as Mock).mockReturnValue(loaderData);

  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<div>Result page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Home Page', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    useStore.setState(originalState, true);

    (useLoaderData as Mock).mockReturnValue({ fiatCurrencies: mockFiatCurrencies });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly with initial data from loader', async () => {
    renderHomePage({ fiatCurrencies: mockFiatCurrencies });

    // BalanceInput
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();

    // CurrencySelector
    expect(screen.getByText('Select up to 3 currencies')).toBeInTheDocument();

    // Button
    const conversionButton = screen.getByRole('button', { name: /show conversion/i });
    expect(conversionButton).toBeInTheDocument();
    expect(conversionButton).toBeDisabled();
  });

  it('updates balance in store when BalanceInput changes', async () => {
    const setBalanceSpy = vi.spyOn(useStore.getState(), 'setBalance');
    renderHomePage({ fiatCurrencies: mockFiatCurrencies });
    const balanceInput = screen.getByPlaceholderText('Enter amount');

    await user.clear(balanceInput);
    await user.type(balanceInput, '150,75');

    await waitFor(() => {
      expect(setBalanceSpy).toHaveBeenCalledWith(150.75);
    });

    expect(useStore.getState().balance).toBe(150.75);
    setBalanceSpy.mockRestore();
  });


  it('updates selected currencies in store, enables button, and shows toast on max selection', async () => {
    const setSelectedCurrenciesSpy = vi.spyOn(useStore.getState(), 'setSelectedCurrencies');
    renderHomePage({ fiatCurrencies: mockFiatCurrencies });

    const currencySelectorControl = screen.getByText(/select up to 3 currencies/i);
    const conversionButton = screen.getByRole('button', { name: /show conversion/i });

    // Dollar
    await user.click(currencySelectorControl);
    await user.click(await screen.findByText('US Dollar'));
    await waitFor(() => {
      expect(setSelectedCurrenciesSpy).toHaveBeenCalledWith(expect.arrayContaining([{ value: 'USD', label: 'US Dollar' }]));
      expect(conversionButton).not.toBeDisabled();
    });
    expect(useStore.getState().selectedCurrencies).toEqual(expect.arrayContaining([{ value: 'USD', label: 'US Dollar' }]));

    // Euro
    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByText('Euro'));
    await waitFor(() => {
      expect(setSelectedCurrenciesSpy).toHaveBeenCalledWith(expect.arrayContaining([
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' }
      ]));
    });
    expect(useStore.getState().selectedCurrencies.length).toBe(2);

    // GBP
    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByText('British Pound'));
    await waitFor(() => {
      expect(setSelectedCurrenciesSpy).toHaveBeenCalledWith(expect.arrayContaining([
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'British Pound' }
      ]));
    });
    expect(useStore.getState().selectedCurrencies.length).toBe(3);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        'You’ve selected the maximum of 3 allowed currencies.',
        expect.objectContaining({ closeButton: true })
      );

      expect(useStore.getState().selectedCurrencies.length).toBe(3);
      expect(setSelectedCurrenciesSpy).toHaveBeenLastCalledWith(expect.arrayContaining([
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'British Pound' }
      ]));
    });

    setSelectedCurrenciesSpy.mockRestore();
  });


  it('"Show conversion" button should be disabled if no currencies are selected', async () => {
    renderHomePage({ fiatCurrencies: mockFiatCurrencies });
    const conversionButton = screen.getByRole('button', { name: /show conversion/i });
    const currencySelectorControl = screen.getByText(/select up to 3 currencies/i);

    expect(conversionButton).toBeDisabled();

    await user.click(currencySelectorControl);
    await user.click(await screen.findByText('US Dollar'));
    await waitFor(() => expect(conversionButton).not.toBeDisabled());

    const removeUsdButton = screen.getByLabelText(`Remove US Dollar`);
    await user.click(removeUsdButton);
    await waitFor(() => expect(conversionButton).toBeDisabled());
  });


  it('navigates to /result when "Show conversion" button is clicked', async () => {
    renderHomePage({ fiatCurrencies: mockFiatCurrencies });
    const currencySelectorControl = screen.getByText(/select up to 3 currencies/i);
    const conversionButton = screen.getByRole('button', { name: /show conversion/i });

    await user.click(currencySelectorControl);
    await user.click(await screen.findByText('US Dollar'));
    await waitFor(() => expect(conversionButton).not.toBeDisabled());

    await user.click(conversionButton);

    expect(mockNavigate).toHaveBeenCalledWith('/result');
  });
});