import React from 'react';
import CategorySection from '../components/CategorySection';
import { Card } from '../components/ui/card';

const VlogsPage: React.FC = () => {
  const dailyVlogs = [
    { id: 'vlog1', title: 'Um Dia na Vida: Game Developer', thumbnail: 'https://picsum.photos/400/225?random=31', duration: '15:20' },
    { id: 'vlog2', title: 'Setup Gamer 2024', thumbnail: 'https://picsum.photos/400/225?random=32', duration: '18:45' },
    { id: 'vlog3', title: 'Evento de Games São Paulo', thumbnail: 'https://picsum.photos/400/225?random=33', duration: '22:10' },
    { id: 'vlog4', title: 'Unboxing: PS5 Pro', thumbnail: 'https://picsum.photos/400/225?random=34', duration: '12:30' },
  ];

  const travelVlogs = [
    { id: 'vlog5', title: 'Gamescom 2024 - Alemanha', thumbnail: 'https://picsum.photos/400/225?random=35', duration: '25:15' },
    { id: 'vlog6', title: 'E3 Experience', thumbnail: 'https://picsum.photos/400/225?random=36', duration: '20:40' },
    { id: 'vlog7', title: 'Tóquio: Paraíso Gamer', thumbnail: 'https://picsum.photos/400/225?random=37', duration: '28:25' },
    { id: 'vlog8', title: 'California - Visita à Blizzard', thumbnail: 'https://picsum.photos/400/225?random=38', duration: '32:50' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vlogs 🎥</h1>
        <p className="text-gray-600">Acompanhe o dia a dia, eventos e bastidores do mundo dos games</p>
      </div>

      {/* Vlog em Destaque */}
      <Card className="mb-12 overflow-hidden">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-3xl">▶️</span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-2">Vlog Especial: 1 Milhão de Inscritos!</h2>
              <p className="opacity-90">Celebrando essa conquista incrível com vocês!</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Seções de vlogs */}
      <CategorySection title="Vlogs Diários" videos={dailyVlogs} />
      <CategorySection title="Viagens e Eventos" videos={travelVlogs} />

      {/* Playlists */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Playlists Populares</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white text-2xl">
                🎬
              </div>
              <div>
                <h4 className="font-semibold">Behind the Scenes</h4>
                <p className="text-sm text-gray-600">24 vídeos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center text-white text-2xl">
                🏆
              </div>
              <div>
                <h4 className="font-semibold">Eventos 2024</h4>
                <p className="text-sm text-gray-600">18 vídeos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg flex items-center justify-center text-white text-2xl">
                🎮
              </div>
              <div>
                <h4 className="font-semibold">Setup Tour</h4>
                <p className="text-sm text-gray-600">12 vídeos</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VlogsPage;
