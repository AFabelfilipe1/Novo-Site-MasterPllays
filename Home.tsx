import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import CategorySection from '../components/CategorySection';
import { ROUTES } from '../const';

const Home: React.FC = () => {
  // Dados mockados (substitua por dados reais)
  const featuredVideos = [
    { id: '1', title: 'Gameplay de Ação Incrível', thumbnail: 'https://picsum.photos/400/225?random=1', duration: '12:34' },
    { id: '2', title: 'Vlog: Novidades da Semana', thumbnail: 'https://picsum.photos/400/225?random=2', duration: '08:45' },
    { id: '3', title: 'Review do Novo Jogo', thumbnail: 'https://picsum.photos/400/225?random=3', duration: '15:20' },
    { id: '4', title: 'Tutorial: Como Jogar', thumbnail: 'https://picsum.photos/400/225?random=4', duration: '22:10' },
  ];

  const trendingVideos = [
    { id: '5', title: 'Top 10 Jogos do Ano', thumbnail: 'https://picsum.photos/400/225?random=5', duration: '18:30' },
    { id: '6', title: 'Unboxing Especial', thumbnail: 'https://picsum.photos/400/225?random=6', duration: '14:25' },
    { id: '7', title: 'Gameplay Multiplayer', thumbnail: 'https://picsum.photos/400/225?random=7', duration: '25:40' },
    { id: '8', title: 'Entrevista com Desenvolvedor', thumbnail: 'https://picsum.photos/400/225?random=8', duration: '32:15' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bem-vindo ao <span className="text-yellow-300">MasterPllays</span>
          </h1>
          <p className="text-lg mb-6 opacity-90">
            O melhor conteúdo de games, vlogs e entretenimento em um só lugar!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              <Link to={ROUTES.GAMES}>Explorar Jogos</Link>
            </Button>
            <Button variant="ghost" className="bg-white/20 hover:bg-white/30" size="lg">
              <Link to={ROUTES.VLOGS}>Ver Vlogs</Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
          <div className="text-9xl">🎮</div>
        </div>
      </section>

      {/* Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-3">🎬</div>
          <h3 className="font-bold text-lg">Movies</h3>
          <p className="text-gray-600 text-sm mt-2">Filmes e trailers</p>
        </Card>
        <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-3">🎮</div>
          <h3 className="font-bold text-lg">Games</h3>
          <p className="text-gray-600 text-sm mt-2">Gameplays e reviews</p>
        </Card>
        <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-3">🎥</div>
          <h3 className="font-bold text-lg">Vlogs</h3>
          <p className="text-gray-600 text-sm mt-2">Vlogs diários</p>
        </Card>
        <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="font-bold text-lg">App</h3>
          <p className="text-gray-600 text-sm mt-2">Baixe nosso app</p>
        </Card>
      </div>

      {/* Seções de vídeo */}
      <CategorySection title="Destaques" videos={featuredVideos} />
      <CategorySection title="Em Alta" videos={trendingVideos} />

      {/* CTA Final */}
      <Card className="text-center p-8 mt-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <h2 className="text-2xl font-bold mb-4">Não perca nada!</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Cadastre-se para receber notificações de novos vídeos, participar de sorteios exclusivos e muito mais.
        </p>
        <Button variant="primary" size="lg">
          <Link to={ROUTES.AUTH}>Cadastrar-se Gratuitamente</Link>
        </Button>
      </Card>
    </div>
  );
};

export default Home;
