import React from 'react';
import CategorySection from '../components/CategorySection';
import { Card } from '../components/ui/card';

const GamesPage: React.FC = () => {
  const actionGames = [
    { id: 'game1', title: 'Call of Duty: Modern Warfare', thumbnail: 'https://picsum.photos/400/225?random=11', duration: '45:20' },
    { id: 'game2', title: 'God of War Ragnarök', thumbnail: 'https://picsum.photos/400/225?random=12', duration: '38:45' },
    { id: 'game3', title: 'Elden Ring Gameplay', thumbnail: 'https://picsum.photos/400/225?random=13', duration: '52:10' },
    { id: 'game4', title: 'Cyberpunk 2077', thumbnail: 'https://picsum.photos/400/225?random=14', duration: '41:30' },
  ];

  const rpgGames = [
    { id: 'game5', title: 'Final Fantasy XVI', thumbnail: 'https://picsum.photos/400/225?random=15', duration: '28:15' },
    { id: 'game6', title: 'The Witcher 3', thumbnail: 'https://picsum.photos/400/225?random=16', duration: '36:40' },
    { id: 'game7', title: 'Baldur\'s Gate 3', thumbnail: 'https://picsum.photos/400/225?random=17', duration: '49:25' },
    { id: 'game8', title: 'Persona 5 Royal', thumbnail: 'https://picsum.photos/400/225?random=18', duration: '33:50' },
  ];

  const indieGames = [
    { id: 'game9', title: 'Hollow Knight', thumbnail: 'https://picsum.photos/400/225?random=19', duration: '22:45' },
    { id: 'game10', title: 'Celeste', thumbnail: 'https://picsum.photos/400/225?random=20', duration: '19:30' },
    { id: 'game11', title: 'Stardew Valley', thumbnail: 'https://picsum.photos/400/225?random=21', duration: '27:15' },
    { id: 'game12', title: 'Hades', thumbnail: 'https://picsum.photos/400/225?random=22', duration: '31:40' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Games 🎮</h1>
        <p className="text-gray-600">As melhores gameplays, reviews e dicas do mundo dos jogos</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">Todos</button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm">Ação</button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm">RPG</button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm">Indie</button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm">Esportes</button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm">Estratégia</button>
      </div>

      {/* Seções de jogos */}
      <CategorySection title="Jogos de Ação" videos={actionGames} />
      <CategorySection title="RPGs Épicos" videos={rpgGames} />
      <CategorySection title="Indie Gems" videos={indieGames} />

      {/* Destaque do Mês */}
      <Card className="p-6 mb-12 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-8xl">
              🏆
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Jogo do Mês</h2>
            <h3 className="text-xl font-semibold mb-4">Elden Ring - Gameplay Completo</h3>
            <p className="text-gray-700 mb-4">
              Confira nossa série completa de gameplay de Elden Ring com todas as dicas, chefes secretos e finais alternativos.
            </p>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Assistir Série Completa
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamesPage;
