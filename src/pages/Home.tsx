// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
  creator?: string;
  views?: string;
}

interface CarouselProps {
  videos: Video[];
  title: string;
  onVideoClick?: (video: Video) => void;
}

const VideoCarousel: React.FC<CarouselProps> = ({ videos, title, onVideoClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Largura aproximada de um card + gap
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleScroll = () => checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [videos]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-80 group cursor-pointer"
            onClick={() => onVideoClick?.(video)}
          >
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-3">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>

              {/* New badge */}
              {video.isNew && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                  NOVO
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                {video.title}
              </h3>
              {video.creator && (
                <p className="text-gray-400 text-xs">{video.creator}</p>
              )}
              {video.views && (
                <p className="text-gray-500 text-xs">{video.views} visualizações</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { user } = useAuth();
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Dados mockados de vídeos expandidos
    const videoData: Video[] = [
      {
        id: '1',
        title: 'Tutorial React Avançado - Hooks e Context API',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        category: 'Programação',
        duration: '45:30',
        isNew: true,
        isFeatured: true,
        description: 'Aprenda os conceitos avançados do React com hooks modernos e gerenciamento de estado global.',
        creator: 'DevMaster',
        views: '12.5K'
      },
      {
        id: '2',
        title: 'Design de Interfaces Modernas com Figma',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
        category: 'Design',
        duration: '32:15',
        isNew: false,
        description: 'Crie interfaces incríveis e modernas usando as melhores práticas do Figma.',
        creator: 'DesignPro',
        views: '8.2K'
      },
      {
        id: '3',
        title: 'Machine Learning Básico - Introdução à IA',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
        category: 'IA',
        duration: '28:45',
        isNew: true,
        description: 'Descubra os fundamentos da Inteligência Artificial e Machine Learning.',
        creator: 'AI Expert',
        views: '15.7K'
      },
      {
        id: '4',
        title: 'Fotografia Profissional - Técnicas Avançadas',
        thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=225&fit=crop',
        category: 'Fotografia',
        duration: '52:20',
        isNew: false,
        description: 'Domine técnicas profissionais de fotografia e edição de imagens.',
        creator: 'PhotoMaster',
        views: '6.9K'
      },
      {
        id: '5',
        title: 'Produção de Música Eletrônica 2024',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
        category: 'Música',
        duration: '38:12',
        isNew: true,
        description: 'Aprenda a produzir tracks eletrônicos com equipamentos modernos.',
        creator: 'MusicProducer',
        views: '9.3K'
      },
      {
        id: '6',
        title: 'Viagem pelo Mundo - Destinos Incríveis',
        thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=225&fit=crop',
        category: 'Viagem',
        duration: '41:33',
        isNew: false,
        description: 'Explore os destinos mais incríveis do mundo com dicas exclusivas.',
        creator: 'TravelExplorer',
        views: '11.1K'
      },
      {
        id: '7',
        title: 'Jogos Indie - Descobertas 2024',
        thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=225&fit=crop',
        category: 'Games',
        duration: '29:45',
        isNew: true,
        description: 'Conheça os melhores jogos indie lançados neste ano.',
        creator: 'GameReviewer',
        views: '18.2K'
      },
      {
        id: '8',
        title: 'Culinária Gourmet - Receitas Premium',
        thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
        category: 'Culinária',
        duration: '35:20',
        isNew: false,
        description: 'Receitas gourmet preparadas por chefs renomados.',
        creator: 'ChefGourmet',
        views: '7.8K'
      },
      {
        id: '9',
        title: 'Fitness e Saúde - Rotina Completa',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop',
        category: 'Fitness',
        duration: '42:10',
        isNew: false,
        description: 'Rotina completa de exercícios e dicas de saúde.',
        creator: 'FitnessCoach',
        views: '14.6K'
      },
      {
        id: '10',
        title: 'Desenvolvimento Mobile com React Native',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
        category: 'Programação',
        duration: '55:20',
        isNew: true,
        description: 'Crie aplicativos móveis incríveis com React Native.',
        creator: 'MobileDev',
        views: '22.1K'
      },
      {
        id: '11',
        title: 'Ilustração Digital - Do Básico ao Avançado',
        thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=225&fit=crop',
        category: 'Design',
        duration: '48:15',
        isNew: false,
        description: 'Aprenda ilustração digital com técnicas profissionais.',
        creator: 'DigitalArtist',
        views: '9.8K'
      },
      {
        id: '12',
        title: 'Deep Learning com TensorFlow',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
        category: 'IA',
        duration: '67:30',
        isNew: true,
        description: 'Implemente redes neurais profundas com TensorFlow.',
        creator: 'DataScientist',
        views: '16.4K'
      }
    ];

    setVideos(videoData);

    // Define o vídeo em destaque
    const featured = videoData.find(video => video.isFeatured) || videoData[0];
    setFeaturedVideo(featured);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={featuredVideo?.thumbnail || 'https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?w=1920&h=1080&fit=crop'}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Master<span className="text-red-600">Pllays</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Assista aos melhores conteúdos exclusivos. Tutoriais, cursos e entretenimento premium em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <>
                  <Link
                    to="/auth"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                  >
                    Começar Agora
                  </Link>
                  <Link
                    to="/planos"
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 backdrop-blur-sm border border-white/20 text-center"
                  >
                    Ver Planos
                  </Link>
                </>
              ) : (
                <Link
                  to="/videos"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                >
                  Explorar Conteúdo
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Content Sections */}
      <main className="relative z-10 -mt-32 pb-20">

        {/* Continue Watching */}
        {user && (
          <VideoCarousel
            videos={videos.slice(0, 6)}
            title="Continuar Assistindo"
            onVideoClick={(video) => console.log('Play video:', video.title)}
          />
        )}

        {/* Trending Now */}
        <VideoCarousel
          videos={videos.filter(v => v.isNew).slice(0, 8)}
          title="Em Alta Agora"
          onVideoClick={(video) => console.log('Play video:', video.title)}
        />

        {/* Programming Videos */}
        <VideoCarousel
          videos={videos.filter(v => v.category === 'Programação').slice(0, 8)}
          title="Programação"
          onVideoClick={(video) => console.log('Play video:', video.title)}
        />

        {/* Design Videos */}
        <VideoCarousel
          videos={videos.filter(v => v.category === 'Design').slice(0, 8)}
          title="Design & Criatividade"
          onVideoClick={(video) => console.log('Play video:', video.title)}
        />

        {/* AI Videos */}
        <VideoCarousel
          videos={videos.filter(v => v.category === 'IA').slice(0, 8)}
          title="Inteligência Artificial"
          onVideoClick={(video) => console.log('Play video:', video.title)}
        />

        {/* More Categories */}
        <VideoCarousel
          videos={videos.filter(v => ['Fotografia', 'Música', 'Viagem', 'Games'].includes(v.category)).slice(0, 8)}
          title="Mais Categorias"
          onVideoClick={(video) => console.log('Play video:', video.title)}
        />

        {/* CTA Section */}
        {!user && (
          <section className="mt-20 bg-gradient-to-r from-red-600 to-red-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Pronto para começar?
                </h2>
                <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                  Junte-se a milhares de usuários e tenha acesso ilimitado ao melhor conteúdo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/planos"
                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    Ver Planos
                  </Link>
                  <Link
                    to="/auth"
                    className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-800 transition-colors duration-200"
                  >
                    Criar Conta
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;