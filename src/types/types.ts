export type FiatCurrency = {
  id: string;
  name: string;
  min_size: string;
}

export type Option = {
  value: string;
  label: string;
}

export type CurrencyAPI = {
  currency: string;
  rates: { [key: string]: string };
}