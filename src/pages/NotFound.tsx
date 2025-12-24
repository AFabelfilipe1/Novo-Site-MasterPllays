import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-8">
        Página não encontrada
      </h2>
      <p className="text-gray-500 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        to="/" 
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Voltar para Home
      </Link>
    </div>
  )
}