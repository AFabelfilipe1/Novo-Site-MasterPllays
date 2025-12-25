// src/pages/Home.tsx
import React, { useState, useEffect, useMemo } from 'react';
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
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    // Dados mockados de vídeos
    const videoData: Video[] = [
      {
        id: '1',
        title: 'Tutorial React Avançado',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        category: 'Programação',
        duration: '45:30',
        isNew: true,
        isFeatured: true
      },
      {
        id: '2',
        title: 'Design de Interfaces Modernas',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
        category: 'Design',
        duration: '32:15',
        isNew: false
      },
      {
        id: '3',
        title: 'Machine Learning Básico',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
        category: 'IA',
        duration: '28:45',
        isNew: true
      },
      {
        id: '4',
        title: 'Fotografia Profissional',
        thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=225&fit=crop',
        category: 'Fotografia',
        duration: '52:20',
        isNew: false
      },
      {
        id: '5',
        title: 'Música Eletrônica 2024',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
        category: 'Música',
        duration: '38:12',
        isNew: true
      },
      {
        id: '6',
        title: 'Viagem pelo Mundo',
        thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=225&fit=crop',
        category: 'Viagem',
        duration: '41:33',
        isNew: false
      }
    ];

    setVideos(videoData);

    // Define o vídeo em destaque
    const featured = videoData.find(video => video.isFeatured) || videoData[0];
    setFeaturedVideo(featured);
  }, []);

  const categories = ['Todos', 'Programação', 'Design', 'IA', 'Fotografia', 'Música', 'Viagem'];

  const filteredVideos = useMemo(() => {
    return selectedCategory === 'Todos'
      ? videos
      : videos.filter(video => video.category === selectedCategory);
  }, [videos, selectedCategory]);

  const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video">
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

      <h3 className="mt-2 text-white font-medium text-sm group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
        {video.title}
      </h3>
      <p className="text-gray-400 text-xs">{video.category}</p>
    </div>
  );

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
              Master<span className="text-red-600">Plays</span>
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
          <section className="mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white mb-6">Continuar Assistindo</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {videos.slice(0, 6).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedCategory === 'Todos' ? 'Conteúdo em Destaque' : selectedCategory}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredVideos.map((video: Video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

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