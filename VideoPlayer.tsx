import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import VideoCard from '../components/VideoCard';
import { getVideoById } from '../utils/db';
import { ROUTES } from '../const';

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: 'GamerPro', text: 'Excelente gameplay!', time: '2 horas atrás' },
    { id: 2, user: 'TechLover', text: 'Onde consigo esse jogo?', time: '1 hora atrás' },
    { id: 3, user: 'StreamerGirl', text: 'Adorei as dicas!', time: '30 minutos atrás' },
  ]);
  const [newComment, setNewComment] = useState('');

  // Carrega dados do vídeo
  useEffect(() => {
    const loadVideo = async () => {
      const videoData = await getVideoById(id || '1');
      setVideo(videoData);
    };
    loadVideo();
  }, [id]);

  // Vídeos relacionados
  const relatedVideos = [
    { id: 'rel1', title: 'Gameplay Parte 2', thumbnail: 'https://picsum.photos/400/225?random=51', duration: '24:30' },
    { id: 'rel2', title: 'Review Completo', thumbnail: 'https://picsum.photos/400/225?random=52', duration: '18:45' },
    { id: 'rel3', title: 'Comparativo com Competidores', thumbnail: 'https://picsum.photos/400/225?random=53', duration: '32:10' },
    { id: 'rel4', title: 'Todas as Dicas', thumbnail: 'https://picsum.photos/400/225?random=54', duration: '15:20' },
  ];

  // Funções do player
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('video-container');
    if (element) {
      if (!isFullscreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: 'Você',
        text: newComment,
        time: 'Agora mesmo',
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  if (!video) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="loader mx-auto mb-4"></div>
          <p>Carregando vídeo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Player de Vídeo */}
      <div id="video-container" className="mb-8 bg-black rounded-xl overflow-hidden">
        <div className="relative aspect-video">
          {/* Vídeo */}
          <video
            ref={videoRef}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            poster="https://picsum.photos/1280/720?random=60"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>

          {/* Controles do Player */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Barra de progresso */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-white text-sm mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Botões de controle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <span className="text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  ⏭️ 10s
                </Button>
                
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? '⛶' : '⛶'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações do vídeo */}
        <div className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <p className="text-gray-600 mb-4">{video.description}</p>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="flex items-center gap-2">
                    👍 1.2K
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2">
                    👎 45
                  </Button>
                </div>
                
                <Button variant="ghost" className="flex items-center gap-2">
                  💬 {comments.length}
                </Button>
                
                <Button variant="ghost" className="flex items-center gap-2">
                  📤 Compartilhar
                </Button>
                
                <Button variant="ghost">
                  ⭐ Salvar
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Publicado em: 15 Nov 2024 • 125K visualizações
              </div>
            </div>

            {/* Criador */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  🎮
                </div>
                <div>
                  <h3 className="font-bold">MasterPllays</h3>
                  <p className="text-sm text-gray-600">1.2M inscritos</p>
                </div>
              </div>
              <Button variant="primary">Inscrever-se</Button>
            </div>
          </Card>

          {/* Comentários */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Comentários ({comments.length})</h2>
            
            {/* Adicionar comentário */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                </div>
                <Button variant="primary" onClick={handleAddComment}>
                  Comentar
                </Button>
              </div>
            </div>

            {/* Lista de comentários */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      {comment.user.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{comment.user}</span>
                      <span className="text-sm text-gray-600">{comment.time}</span>
                    </div>
                    <p>{comment.text}</p>
                    <div className="flex gap-4 mt-2">
                      <button className="text-sm text-gray-600 hover:text-blue-600">
                        👍
                      </button>
                      <button className="text-sm text-gray-600 hover:text-blue-600">
                        👎
                      </button>
                      <button className="text-sm text-gray-600 hover:text-blue-600">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - Vídeos relacionados */}
        <div>
          <h3 className="text-lg font-bold mb-4">Vídeos Relacionados</h3>
          <div className="space-y-4">
            {relatedVideos.map((video) => (
              <div key={video.id} onClick={() => navigate(ROUTES.WATCH(video.id))}>
                <VideoCard {...video} />
              </div>
            ))}
          </div>

          {/* Informações adicionais */}
          <Card className="p-4 mt-6">
            <h4 className="font-bold mb-3">Sobre este vídeo</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Categoria:</span>
                <span>Games</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tags:</span>
                <span>gameplay, review, tutorial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Licença:</span>
                <span>Padrão do YouTube</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
