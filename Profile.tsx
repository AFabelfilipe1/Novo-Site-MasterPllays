import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs } from '../components/ui/tabs';
import VideoCard from '../components/VideoCard';
import { useTheme } from '../contexts/ThemeContext';

const Profile: React.FC = () => {
  const { theme, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados do usuário
  const [userData, setUserData] = useState({
    name: 'Alex Gamer',
    email: 'alex@masterpllays.com',
    bio: 'Criador de conteúdo apaixonado por games e tecnologia. Focado em trazer as melhores gameplays e reviews para a comunidade! 🎮',
    location: 'São Paulo, Brasil',
    joinDate: 'Junho 2020',
    followers: '125K',
    following: '342',
    videos: '48',
  });

  // Vídeos do usuário
  const userVideos = [
    { id: 'user1', title: 'Meu Novo Setup Gamer 2024', thumbnail: 'https://picsum.photos/400/225?random=41', duration: '18:30' },
    { id: 'user2', title: 'Gameplay: Elden Ring DLC', thumbnail: 'https://picsum.photos/400/225?random=42', duration: '45:20' },
    { id: 'user3', title: 'Review: PlayStation 5 Pro', thumbnail: 'https://picsum.photos/400/225?random=43', duration: '22:15' },
    { id: 'user4', title: 'Vlog: Gamescom 2024', thumbnail: 'https://picsum.photos/400/225?random=44', duration: '28:40' },
    { id: 'user5', title: 'Tutorial: Como Streamar', thumbnail: 'https://picsum.photos/400/225?random=45', duration: '15:50' },
    { id: 'user6', title: 'Top 10 Jogos 2024', thumbnail: 'https://picsum.photos/400/225?random=46', duration: '32:25' },
  ];

  // Playlists
  const playlists = [
    { name: 'Gameplays Completos', count: 12, color: 'bg-blue-500' },
    { name: 'Reviews & Análises', count: 8, color: 'bg-purple-500' },
    { name: 'Vlogs Diários', count: 24, color: 'bg-green-500' },
    { name: 'Tutoriais', count: 6, color: 'bg-yellow-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header do Perfil */}
      <Card className="p-8 mb-8 relative overflow-hidden">
        {/* Banner */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-4xl">
                  🎮
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
            </div>

            {/* Informações */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">@{userData.name.toLowerCase().replace(' ', '')}</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button variant="primary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Salvar' : 'Editar Perfil'}
                  </Button>
                  <Button variant="secondary">Compartilhar</Button>
                  <Button variant="ghost" onClick={toggle}>
                    {theme === 'light' ? '🌙' : '☀️'}
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{userData.bio}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.followers}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.following}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Seguindo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.videos}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vídeos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.joinDate}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Membro desde</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Formulário de Edição */}
      {isEditing && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
          <div className="space-y-4">
            <Input label="Nome" defaultValue={userData.name} />
            <Input label="E-mail" type="email" defaultValue={userData.email} />
            <Textarea label="Biografia" defaultValue={userData.bio} rows={3} />
            <Input label="Localização" defaultValue={userData.location} />
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setIsEditing(false)}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs de Conteúdo */}
      <Tabs
        tabs={[
          { id: 'videos', label: 'Vídeos' },
          { id: 'playlists', label: 'Playlists' },
          { id: 'likes', label: 'Curtidos' },
          { id: 'history', label: 'Histórico' },
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      {/* Conteúdo das Tabs */}
      <div className="mt-8">
        {activeTab === 'videos' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Meus Vídeos</h3>
              <Button variant="ghost">+ Novo Vídeo</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'playlists' && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Minhas Playlists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.map((playlist, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${playlist.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                    📁
                  </div>
                  <h4 className="font-bold text-lg mb-1">{playlist.name}</h4>
                  <p className="text-gray-600">{playlist.count} vídeos</p>
                </Card>
              ))}
            </div>
            <Button variant="ghost" className="mt-6">
              + Criar Nova Playlist
            </Button>
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">Vídeos Curtidos</h3>
            <p className="text-gray-600 mb-6">Os vídeos que você curtiu aparecerão aqui</p>
            <Button variant="primary">Explorar Vídeos</Button>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Histórico de Visualização</h3>
              <Button variant="ghost">Limpar Histórico</Button>
            </div>
            <Card className="p-6">
              <div className="space-y-4">
                {userVideos.slice(0, 3).map((video, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    <div className="w-24 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{video.title}</h4>
                      <p className="text-sm text-gray-600">Assistido há 2 horas</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Assistir novamente
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Configurações */}
      <Card className="mt-12 p-6">
        <h3 className="text-xl font-semibold mb-4">Configurações da Conta</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium">Notificações por e-mail</p>
              <p className="text-sm text-gray-600">Receba atualizações sobre novos vídeos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium">Privacidade do perfil</p>
              <p className="text-sm text-gray-600">Tornar perfil público</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <Button variant="ghost" className="text-red-600 hover:text-red-800">
            Excluir Conta
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
