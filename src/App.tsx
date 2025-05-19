import { Outlet, useNavigation } from 'react-router'

function App() {
  const navigation = useNavigation()

  return (
    <section className="flex flex-col items-center py-5">
      <h1 className="text-3xl font-bold">Virtual currency wallet</h1>
      {navigation.state !== 'idle' && <>Loading...</>}
      {navigation.state === 'idle' && <Outlet />}
    </section>
  )
}

export default App
