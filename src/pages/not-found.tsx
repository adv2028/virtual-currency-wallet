import { Link } from 'react-router'

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        We're sorry, the page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="py-3 px-6 text-black font-semibold rounded-md bg-blue-300 hover:bg-blue-400 transition disabled:bg-gray-200 cursor-pointer disabled:cursor-auto duration-150 disabled:hover:text-black"
      >
        Return to Home
      </Link>
    </div>
  )
}
