import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs } from '../components/ui/tabs';
import { ROUTES } from '../const';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Estatísticas
  const stats = [
    { label: 'Total de Vídeos', value: '1,248', change: '+12%', icon: '🎬', color: 'bg-blue-500' },
    { label: 'Usuários Ativos', value: '45,289', change: '+8%', icon: '👥', color: 'bg-green-500' },
    { label: 'Visualizações', value: '2.4M', change: '+23%', icon: '👁️', color: 'bg-purple-500' },
    { label: 'Receita', value: 'R$ 18,450', change: '+15%', icon: '💰', color: 'bg-yellow-500' },
  ];

  // Vídeos recentes
  const recentVideos = [
    { id: 1, title: 'Gameplay Final', views: '125K', likes: '8.2K', status: 'Publicado' },
    { id: 2, title: 'Vlog Diário', views: '89K', likes: '6.1K', status: 'Publicado' },
    { id: 3, title: 'Review Especial', views: '45K', likes: '3.4K', status: 'Rascunho' },
    { id: 4, title: 'Tutorial Novo', views: '32K', likes: '2.8K', status: 'Publicado' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gerencie seu conteúdo e analise o desempenho</p>
        </div>
        <Link to={ROUTES.ADMIN_UPLOAD}>
          <Button variant="primary">
            + Novo Conteúdo
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Visão Geral' },
          { id: 'videos', label: 'Vídeos' },
          { id: 'users', label: 'Usuários' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'settings', label: 'Configurações' },
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      {/* Conteúdo das Tabs */}
      <div className="mt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico (placeholder) */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Visualizações dos Últimos 7 Dias</h3>
              <div className="h-64 flex items-end gap-1">
                {[40, 60, 75, 80, 90, 85, 95].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-600">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>
            </Card>

            {/* Vídeos Recentes */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Vídeos Recentes</h3>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{video.title}</h4>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{video.views} views</span>
                        <span>{video.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        video.status === 'Publicado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {video.status}
                      </span>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'videos' && (
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Título</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Views</th>
                    <th className="text-left p-3">Likes</th>
                    <th className="text-left p-3">Data</th>
                    <th className="text-left p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVideos.map((video) => (
                    <tr key={video.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{video.title}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          video.status === 'Publicado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {video.status}
                        </span>
                      </td>
                      <td className="p-3">{video.views}</td>
                      <td className="p-3">{video.likes}</td>
                      <td className="p-3">15 Nov 2024</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Excluir</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-6">Analytics Detalhados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl mb-4">👥</div>
                <div className="text-2xl font-bold mb-2">45.3K</div>
                <p className="text-gray-600">Usuários Ativos</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl mb-4">⏱️</div>
                <div className="text-2xl font-bold mb-2">8:24</div>
                <p className="text-gray-600">Tempo Médio por Sessão</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl mb-4">📈</div>
                <div className="text-2xl font-bold mb-2">68%</div>
                <p className="text-gray-600">Taxa de Retenção</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
