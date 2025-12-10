import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const MoviesComingSoon: React.FC = () => {
  const upcomingMovies = [
    { title: 'Duna: Parte Dois', date: 'Fevereiro 2024', description: 'Continuação da épica saga de Frank Herbert' },
    { title: 'Deadpool 3', date: 'Julho 2024', description: 'O mercenário tagarela está de volta' },
    { title: 'Joker: Folie à Deux', date: 'Outubro 2024', description: 'Sequel do aclamado filme do Coringa' },
    { title: 'Avatar 3', date: 'Dezembro 2025', description: 'Próximo capítulo do universo de Pandora' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Movies Coming Soon 🎬</h1>
        <p className="text-gray-600">Os filmes mais aguardados do cinema e streaming</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {upcomingMovies.map((movie, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">
                🎥
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                  {movie.date}
                </div>
                <p className="text-gray-600">{movie.description}</p>
                <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm">
                  + Adicionar à lista
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Receba Notificações</h2>
          <p className="mb-6 opacity-90">
            Quer ser avisado quando seus filmes favoritos forem lançados? Cadastre-se para receber alertas!
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <Button variant="primary" className="bg-white text-gray-900 hover:bg-gray-200">
              Cadastrar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MoviesComingSoon;
