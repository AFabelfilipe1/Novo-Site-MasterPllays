import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import CategorySection from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  // Mock Data
  const featuredVideos = [
    {
      id: 1,
      title: "Cyberpunk 2077: Phantom Liberty - Final Gameplay Showcase",
      category: "Games",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
      duration: "14:20",
      views: "1.2M"
    },
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
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              Destaque da Semana
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight text-glow">
              A Nova Era do <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Streaming Digital</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              Mergulhe em um universo de conteúdo exclusivo. De gameplays épicas a vlogs imersivos, o MasterPllays é o seu destino definitivo.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-medium shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
                <Play className="w-5 h-5 mr-2 fill-current" />
                Começar a Assistir
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 hover:bg-white/10 border-white/20 text-white rounded-full px-8 h-12 text-base font-medium backdrop-blur-sm">
                <Info className="w-5 h-5 mr-2" />
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <span className="w-1 h-8 bg-primary rounded-full" />
            Em Alta
          </h2>
          <Button variant="link" className="text-primary hover:text-primary/80">
            Ver Todos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>

      {/* Gaming Category */}
      <CategorySection 
        title="Universo Gamer"
        description="Acompanhe as melhores gameplays, reviews aprofundados e as últimas novidades do mundo dos jogos. Do retrô ao next-gen, sua jornada começa aqui."
        image="/images/gaming-category.jpg"
        align="left"
      />

      {/* Vlogs Category */}
      <CategorySection 
        title="Vlogs & Lifestyle"
        description="Viaje pelo mundo sem sair de casa. Conheça novas culturas, bastidores de eventos e o dia a dia dos seus criadores favoritos em qualidade cinematográfica."
        image="/images/vlog-category.jpg"
        align="right"
        className="bg-black/20"
      />

      {/* Coming Soon Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/movies-coming-soon.jpg" 
            alt="Movies Coming Soon" 
            className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            Em Breve
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 text-glow">
            Cinema em Casa
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Estamos preparando uma seleção exclusiva de filmes e séries para você. 
            Prepare a pipoca, a revolução do streaming está chegando.
          </p>
          
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-2 flex">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-transparent border-none outline-none px-6 text-white placeholder:text-white/30"
            />
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              Notifique-me
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
