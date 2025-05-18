import { Outlet } from "react-router"

function App() {
  return (
    <section className="flex flex-col items-center py-5">
      <h1 className="text-3xl font-bold">
        Virtual currency wallet
      </h1>
      <Outlet />
    </section>
  )
}

export default App
