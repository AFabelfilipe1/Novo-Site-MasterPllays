import { useState } from 'react'

export default function Videos() {
  const [activeTab, setActiveTab] = useState('games')

  const gamesVideos = [
    { id: 1, title: 'Gameplay Completo - The Legend of Zelda', thumbnail: 'https://via.placeholder.com/300x200?text=Zelda', duration: '2:30:15' },
    { id: 2, title: 'Review - Cyberpunk 2077', thumbnail: 'https://via.placeholder.com/300x200?text=Cyberpunk', duration: '15:45' },
    { id: 3, title: 'Top 10 Jogos de Aventura 2024', thumbnail: 'https://via.placeholder.com/300x200?text=Top10', duration: '12:20' },
  ]

  const vlogsVideos = [
    { id: 1, title: 'Dia na Vida de um Gamer', thumbnail: 'https://via.placeholder.com/300x200?text=Vlog1', duration: '8:30' },
    { id: 2, title: 'Setup dos Sonhos', thumbnail: 'https://via.placeholder.com/300x200?text=Setup', duration: '10:15' },
    { id: 3, title: 'Entrevista com Desenvolvedor', thumbnail: 'https://via.placeholder.com/300x200?text=Entrevista', duration: '25:40' },
  ]

  const videos = activeTab === 'games' ? gamesVideos : vlogsVideos

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Playlists de Vídeos</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab('games')}
          className={`px-6 py-2 mx-2 rounded-lg font-semibold ${activeTab === 'games' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Jogos
        </button>
        <button
          onClick={() => setActiveTab('vlogs')}
          className={`px-6 py-2 mx-2 rounded-lg font-semibold ${activeTab === 'vlogs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Vlogs
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{video.title}</h3>
              <p className="text-gray-600">Duração: {video.duration}</p>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Assistir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}