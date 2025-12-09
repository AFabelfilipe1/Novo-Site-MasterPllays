import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Play, Heart, Eye } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function VlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  
  const videosQuery = trpc.videos.list.useQuery({ category: "vlogs" });

  useEffect(() => {
    if (videosQuery.data) {
      const filtered = videosQuery.data.filter((video: any) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [videosQuery.data, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                🎬 <span className="text-primary">Vlogs</span>
              </h1>
              <p className="text-xl text-foreground/60 max-w-2xl">
                Conteúdo criativo, autêntico e imersivo de criadores que você ama.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-3 focus-within:border-primary/50 focus-within:bg-white/10 transition-all">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar vlogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full ml-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            {videosQuery.isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-foreground/60">Carregando vlogs...</p>
                </div>
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video: any) => (
                  <Link key={video.id} href={`/watch/${video.id}`}>
                    <Card className="backdrop-blur-xl bg-white/10 border-white/20 overflow-hidden hover:border-primary/50 hover:bg-white/15 transition-all group cursor-pointer h-full">
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden aspect-video bg-black/40">
                        <img
                          src={video.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=500&h=280&fit=crop"}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-foreground/60 line-clamp-2">
                          {video.description || "Confira este incrível vlog"}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-foreground/40 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{(video.views || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{(video.likes || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 text-lg mb-4">
                  {searchQuery ? "Nenhum vlog encontrado com essa busca" : "Nenhum vlog disponível no momento"}
                </p>
                {searchQuery && (
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Limpar busca
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
