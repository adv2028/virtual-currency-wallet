import { Link } from "react-router"

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Lo sentimos, la página que estás buscando no existe.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150"
      >
        Volver al Inicio
      </Link>
    </div>
  )
}