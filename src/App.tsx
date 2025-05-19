import { Outlet, useNavigation } from 'react-router'

function App() {
  const navigation = useNavigation()

  return (
    <section className="flex flex-col items-center pt-11 bg-gray-100 h-dvh">
      <div className='bg-white w-[300px] md:w-[500px] lg:w-[600px] min-h-40 rounded-lg shadow-xl p-6 sm:p-8'>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Virtual currency wallet</h1>
        {navigation.state !== 'idle' && <>Loading...</>}
        {navigation.state === 'idle' && <Outlet />}
      </div>
    </section>
  )
}

export default App
