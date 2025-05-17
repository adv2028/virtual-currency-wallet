import { useEffect } from "react"
import { coinbaseApi } from "./config/axios"

function App() {

  const onGetRates = async () => {
    const response = await coinbaseApi.get("/exchange-rates?currency=USD")

    return response
  }

  useEffect(() => {
    onGetRates()
  }, [])

  return (
    <h1 className="text-3xl font-bold">
      Cartera Virtual de Divisas
    </h1>
  )
}

export default App
