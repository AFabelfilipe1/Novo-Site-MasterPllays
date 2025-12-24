// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MasterPlays
        </Link>
        
        <nav className="space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/videos" className="hover:text-gray-300">Vídeos</Link>
          <Link to="/planos" className="hover:text-gray-300">Planos</Link>
          
          {user ? (
            <div className="inline-flex items-center space-x-4">
              <Link to="/profile" className="hover:text-gray-300">Perfil</Link>
              <span className="text-sm">
                Olá, {user.displayName?.split(' ')[0] || 'Usuário'}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
          
          <Link 
            to="/test" 
            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
          >
            Test Firebase
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;