import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Bell, Star, Calendar } from "lucide-react";
import { useState } from "react"; // Adicionar import

export default function MoviesComingSoon() {
  const upcomingMovies = [
    {
      title: "Cyber Horizon",
      genre: "Sci-Fi / Action",
      release: "Outubro 2025",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2025"
    },
    {
      title: "The Last Glitch",
      genre: "Thriller / Mystery",
      release: "Novembro 2025",
      image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=2070"
    },
    {
      title: "Pixel Heart",
      genre: "Romance / Drama",
      release: "Dezembro 2025",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2071"
    }
  ];

  const [email, setEmail] = useState(""); // Adicionar estado para email

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de inscrição
    console.log("Email inscrito:", email);
    alert("Obrigado por se inscrever! Você será notificado.");
    setEmail("");
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/movies-coming-soon.jpg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2025";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto mb-20 pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 backdrop-blur-md">
              <Film className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">MasterPllays Originals</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 text-glow">
              O Cinema Está Chegando
            </h1>
            
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Uma nova forma de assistir filmes e séries. Curadoria exclusiva, qualidade 4K HDR e produções originais que vão explodir sua mente.
            </p>

            <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="text-white font-bold mb-2 flex items-center justify-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Entre na Lista de Espera
              </h3>
              <p className="text-white/40 text-sm mb-4">
                Seja o primeiro a saber do lançamento e ganhe 1 mês grátis.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Inscrever
                </Button>
              </form>
            </div>
          </div>

          {/* Upcoming Titles Preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              Em Produção
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingMovies.map((movie, index) => (
                <div key={index} className="group relative aspect-[2/3] rounded-xl overflow-hidden glass-card">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2025";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                      {movie.genre}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <Calendar className="w-4 h-4" />
                      {movie.release}
                    </div>
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