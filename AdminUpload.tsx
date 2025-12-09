import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

interface VideoFormData {
  title: string;
  description: string;
  category: "games" | "vlogs" | "";
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  tags: string;
}

export default function AdminUpload() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: 0,
    tags: "",
  });

  useEffect(() => {
    // Se o usuário não está autenticado ou não é admin, redireciona
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [isAuthenticated, user, loading, setLocation]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value as "games" | "vlogs" | "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!formData.title.trim()) {
      toast.error("Título é obrigatório");
      return;
    }
    if (!formData.category) {
      toast.error("Categoria é obrigatória");
      return;
    }
    if (!formData.videoUrl.trim()) {
      toast.error("URL do vídeo é obrigatória");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Simular progresso de upload
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 500);

      // TODO: Implementar chamada à API de upload
      // await trpc.videos.create.mutate(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Vídeo enviado com sucesso!");
      setFormData({
        title: "",
        description: "",
        category: "",
        videoUrl: "",
        thumbnailUrl: "",
        duration: 0,
        tags: "",
      });
      setUploadProgress(0);

      // Redirecionar após 2 segundos
      setTimeout(() => {
        setLocation("/admin");
      }, 2000);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast.error("Erro ao fazer upload do vídeo");
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-foreground/60">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/admin")}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">
              Upload de Vídeo
            </h1>
            <p className="text-foreground/60">Adicione um novo vídeo à plataforma</p>
          </div>
        </div>

        {/* Upload Form */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Título do Vídeo *
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Gameplay - Elden Ring Speedrun"
                className="bg-white/5 border-white/10 text-white placeholder:text-foreground/40"
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrição
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva o conteúdo do vídeo..."
                className="bg-white/5 border-white/10 text-white placeholder:text-foreground/40 min-h-24"
                disabled={isSubmitting}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Categoria *
              </label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10">
                  <SelectItem value="games">🎮 Gameplays</SelectItem>
                  <SelectItem value="vlogs">🎬 Vlogs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                URL do Vídeo *
              </label>
              <Input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/video.mp4"
                className="bg-white/5 border-white/10 text-white placeholder:text-foreground/40"
                disabled={isSubmitting}
              />
              <p className="text-xs text-foreground/40 mt-2">
                Cole a URL do seu vídeo hospedado (YouTube, Vimeo, S3, etc.)
              </p>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                URL da Thumbnail
              </label>
              <Input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-white/5 border-white/10 text-white placeholder:text-foreground/40"
                disabled={isSubmitting}
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Duração (segundos)
              </label>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="0"
                className="bg-white/5 border-white/10 text-white placeholder:text-foreground/40"
                disabled={isSubmitting}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tags (separadas por vírgula)
              </label>
              <Input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="ação, aventura, speedrun"
                className="bg-white/5 border-white/10 text-white placeholder:text-foreground/40"
                disabled={isSubmitting}
              />
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/60">Upload em progresso</span>
                  <span className="text-sm font-medium text-white">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 font-semibold text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Fazer Upload
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Tips Card */}
        <Card className="backdrop-blur-xl bg-primary/10 border-primary/20 p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Dicas para melhor resultado
            </h3>
            <ul className="text-sm text-primary/80 space-y-1">
              <li>✓ Use títulos descritivos e atrativos</li>
              <li>✓ Adicione uma thumbnail de alta qualidade (1280x720px)</li>
              <li>✓ Escreva uma descrição detalhada com tags relevantes</li>
              <li>✓ Certifique-se de que a URL do vídeo é acessível publicamente</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}