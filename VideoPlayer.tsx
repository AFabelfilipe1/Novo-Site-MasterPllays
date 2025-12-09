import { useParams } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share2, Plus, MessageSquare, Flag } from "lucide-react";

export default function VideoPlayer() {
  const { id } = useParams();

  // Mock Data for the current video
  const video = {
    id: id,
    title: "Cyberpunk 2077: Phantom Liberty - Final Gameplay Showcase",
    description: "Mergulhe nas ruas de Dogtown nesta gameplay exclusiva da expansão Phantom Liberty. Exploramos as novas mecânicas, armas e a história envolvente que aguarda V nesta nova aventura. Configurações no Ultra com Ray Tracing Overdrive.",
    channel: "MasterPllays Official",
    subscribers: "1.2M",
    views: "1,245,302",
    date: "2 dias atrás",
    likes: "85K",
    src: "https://www.youtube.com/embed/P99qJGrPNLs?autoplay=1&mute=0"
  };

  // Mock Data for recommendations
  const recommendations = [
    {
      id: 2,
      title: "Exploring Tokyo's Hidden Gaming Bars - Vlog #42",
      category: "Vlogs",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2025",
      duration: "22:15",
      views: "850K"
    },
    {
      id: 3,
      title: "Elden Ring: Shadow of the Erdtree - Boss Guide",
      category: "Games",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2071",
      duration: "18:45",
      views: "2.1M"
    },
    {
      id: 4,
      title: "My Setup Tour 2025 - Ultimate Streaming Room",
      category: "Tech",
      thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=2042",
      duration: "12:30",
      views: "540K"
    },
    {
      id: 5,
      title: "The Future of VR Gaming - Analysis",
      category: "Tech",
      thumbnail: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=2070",
      duration: "15:00",
      views: "320K"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Video Player Container */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/10 mb-6 group">
              <iframe 
                src={video.src} 
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                {video.title}
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{video.channel}</h3>
                    <p className="text-white/40 text-sm">{video.subscribers} inscritos</p>
                  </div>
                  <Button variant="secondary" className="ml-4 rounded-full bg-white text-black hover:bg-white/90 font-bold">
                    Inscrever-se
                  </Button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                    <Button variant="ghost" size="sm" className="rounded-l-full text-white hover:bg-white/10 gap-2 px-4">
                      <ThumbsUp className="w-4 h-4" /> {video.likes}
                    </Button>
                    <div className="w-px h-6 bg-white/10" />
                    <Button variant="ghost" size="sm" className="rounded-r-full text-white hover:bg-white/10 px-4">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="bg-white/5 rounded-full text-white hover:bg-white/10 border border-white/10 gap-2">
                    <Share2 className="w-4 h-4" /> Compartilhar
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="bg-white/5 rounded-full text-white hover:bg-white/10 border border-white/10 gap-2">
                    <Plus className="w-4 h-4" /> Salvar
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="bg-white/5 rounded-full text-white hover:bg-white/10 border border-white/10">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex gap-4 text-sm text-white/60 font-medium mb-2">
                  <span>{video.views} visualizações</span>
                  <span>{video.date}</span>
                </div>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {video.description}
                </p>
                <Button variant="link" className="text-white/40 hover:text-white p-0 h-auto mt-2 text-sm">
                  Mostrar mais
                </Button>
              </div>
            </div>

            {/* Comments Section (Placeholder) */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-white">248 Comentários</h3>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  Ordenar por
                </Button>
              </div>
              
              <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  U
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Adicione um comentário..." 
                    className="w-full bg-transparent border-b border-white/10 focus:border-primary outline-none py-2 text-white transition-colors"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white rounded-full">
                      Cancelar
                    </Button>
                    <Button size="sm" className="bg-primary/50 text-white/50 rounded-full" disabled>
                      Comentar
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Mock Comment */}
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm">GamerPro99</span>
                    <span className="text-white/40 text-xs">2 horas atrás</span>
                  </div>
                  <p className="text-white/80 text-sm mb-2">
                    A qualidade gráfica desse jogo está insana! Mal posso esperar para jogar a expansão. Ótimo vídeo!
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-auto p-0 gap-1">
                      <ThumbsUp className="w-3 h-3" /> 12
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-auto p-0">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-auto p-0 text-xs">
                      Responder
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Recommendations */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Próximos vídeos</h3>
            <div className="flex flex-col gap-4">
              {recommendations.map((video) => (
                <div key={video.id} className="flex gap-3 group cursor-pointer">
                  <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] font-medium text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-white font-medium text-sm line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <span className="text-white/40 text-xs">MasterPllays Official</span>
                    <span className="text-white/40 text-xs">{video.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}