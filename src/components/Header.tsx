import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MasterPlays</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-gray-300 transition-colors">
                Vídeos
              </Link>
            </li>
            <li>
              <Link to="/planos" className="hover:text-gray-300 transition-colors">
                Planos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}