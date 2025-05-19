import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Result } from "../pages/result";
import { NotFoundPage } from "../pages/not-found";
import { coinbaseApi } from "../config/axios";
import type { CurrencyAPI, FiatCurrency, Option } from "../types/types";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async ({ request }) => {
          const response = await coinbaseApi.get(`/currencies`, {
            signal: request.signal,
          })
          const newFiatCurrencies: Option[] = response?.data.data.map((currency: FiatCurrency) => ({ value: currency.id, label: currency.name }))
          return { fiatCurrencies: newFiatCurrencies };
        },
        errorElement: <div>Could not load currencies</div>
      },
      {
        path: "/result",
        element: <Result />,

        loader: async ({ request }) => {
          const response = await coinbaseApi.get("/exchange-rates?currency=EUR", {
            signal: request.signal,
          })
          const data: CurrencyAPI = response?.data.data

          return { rates: data.rates }
        },
        errorElement: <div>Could not load currencies rates</div>
      },
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);