import VideoPlayer from '../components/VideoPlayer'

export default function Home() {
  const demoVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bem-vindo ao MasterPlays
      </h1>
      
      <div className="max-w-4xl mx-auto mb-8">
        <VideoPlayer videoUrl={demoVideoUrl} />
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Assista aos melhores conteúdos
        </h2>
        <p className="text-gray-600 mb-8">
          Tenha acesso exclusivo a vídeos premium e conteúdos especiais.
        </p>
      </div>
    </div>
  )
}