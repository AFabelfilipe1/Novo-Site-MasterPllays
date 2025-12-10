import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ROUTES } from '../const';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-4">Página Não Encontrada</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! Parece que a página que você está procurando não existe ou foi movida.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="primary">
          <Link to={ROUTES.HOME}>Voltar para Home</Link>
        </Button>
        <Button variant="secondary">
          <Link to={ROUTES.GAMES}>Explorar Games</Link>
        </Button>
        <Button variant="ghost">
          <Link to={ROUTES.VLOGS}>Ver Vlogs</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
