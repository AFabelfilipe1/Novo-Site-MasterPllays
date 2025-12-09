import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  LogOut,
  ArrowLeft,
  Upload,
  List,
  Settings,
  BarChart3,
  Play,
  Trash2,
  Edit,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch videos
  const videosQuery = trpc.videos.list.useQuery({});

  useEffect(() => {
    // Se o usuário não está autenticado ou não é admin, redireciona
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [isAuthenticated, user, loading, setLocation]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLocation("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (confirm("Tem certeza que deseja deletar este vídeo?")) {
      // TODO: Implementar endpoint de delete
      console.log("Deletar vídeo:", videoId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-foreground/60">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const totalVideos = videosQuery.data?.length || 0;
  const totalViews = videosQuery.data?.reduce((sum: number, v: any) => sum + (v.views || 0), 0) || 0;
  const gameplayVideos = videosQuery.data?.filter((v: any) => v.category === "games").length || 0;
  const vlogVideos = videosQuery.data?.filter((v: any) => v.category === "vlogs").length || 0;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Painel Administrativo
              </h1>
              <p className="text-foreground/60">Gerencie seu conteúdo</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {logoutMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Desconectando...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Total de Vídeos</p>
                <p className="text-3xl font-bold text-white mt-2">{totalVideos}</p>
              </div>
              <Play className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Gameplays</p>
                <p className="text-3xl font-bold text-white mt-2">{gameplayVideos}</p>
              </div>
              <span className="text-2xl">🎮</span>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Vlogs</p>
                <p className="text-3xl font-bold text-white mt-2">{vlogVideos}</p>
              </div>
              <span className="text-2xl">🎬</span>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Total de Visualizações</p>
                <p className="text-3xl font-bold text-white mt-2">{totalViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary">
                <BarChart3 className="w-4 h-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-primary">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-primary">
                <List className="w-4 h-4 mr-2" />
                Vídeos
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                  <h3 className="font-semibold text-white mb-4">Atividade Recente</h3>
                  <p className="text-foreground/60 text-sm">
                    Nenhuma atividade registrada ainda
                  </p>
                </Card>
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                  <h3 className="font-semibold text-white mb-4">Dicas</h3>
                  <ul className="space-y-2 text-sm text-foreground/60">
                    <li>• Mantenha títulos descritivos e atrativos</li>
                    <li>• Use thumbnails de alta qualidade</li>
                    <li>• Adicione tags relevantes para melhor descoberta</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-4 mt-6">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Upload de Vídeo</h3>
                <p className="text-foreground/60 mb-6">
                  Clique no botão abaixo para acessar a página de upload completa
                </p>
                <Button
                  onClick={() => setLocation("/admin/upload")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Ir para Upload
                </Button>
              </Card>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-4 mt-6">
              <div className="space-y-3">
                {videosQuery.isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : videosQuery.data && videosQuery.data.length > 0 ? (
                  videosQuery.data.map((video: any) => (
                    <Card
                      key={video.id}
                      className="backdrop-blur-xl bg-white/5 border-white/10 p-4 flex items-center justify-between hover:bg-white/10 transition-all"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{video.title}</h4>
                        <p className="text-sm text-foreground/60">
                          {video.category} • {video.views} visualizações
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setLocation(`/admin/edit/${video.id}`)}
                          className="hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteVideo(video.id)}
                          className="hover:bg-destructive/20 text-destructive"
                          disabled
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-foreground/60 text-center py-8">
                    Nenhum vídeo encontrado. Comece fazendo upload!
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-6">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Configurações</h3>
                <p className="text-foreground/60 mb-6">
                  Configurações adicionais estarão disponíveis em breve
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}