import { Outlet } from "react-router"

function App() {
  return (
    <section className="flex flex-col items-center gap-5 py-5">
      <h1 className="text-3xl font-bold">
        Cartera Virtual de Divisas
      </h1>
      <Outlet />
    </section>
  )
}

export default App
