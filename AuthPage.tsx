import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, Github, Globe } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

const SOCIAL_PROVIDERS = [
  {
    id: "google",
    name: "Google",
    icon: "🔍",
    color: "bg-white hover:bg-gray-100 text-gray-900",
    description: "Rápido e seguro"
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    color: "bg-blue-600 hover:bg-blue-700 text-white",
    description: "Conecte com sua conta"
  },
  {
    id: "github",
    name: "GitHub",
    icon: "⚙️",
    color: "bg-gray-800 hover:bg-gray-900 text-white",
    description: "Para desenvolvedores"
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: "◻️",
    color: "bg-blue-500 hover:bg-blue-600 text-white",
    description: "Conta Microsoft"
  },
];

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Se o usuário já está autenticado, redireciona para home
    if (isAuthenticated && user) {
      setLocation("/");
    }
  }, [isAuthenticated, user, setLocation]);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Redireciona para o Manus OAuth com o provedor selecionado
    window.location.href = `${getLoginUrl()}&provider=${provider}`;
  };

  const handleDefaultLogin = () => {
    setIsLoading(true);
    window.location.href = getLoginUrl();
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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Master<span className="text-primary">Pllays</span>
          </h1>
          <p className="text-foreground/60">
            {activeTab === "login" ? "Bem-vindo de volta" : "Junte-se à comunidade"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === "login"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === "signup"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Cadastro
          </button>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-8 mb-6">
          <div className="space-y-6">
            {/* Social Login Options */}
            <div>
              <h3 className="text-sm font-semibold text-foreground/60 mb-4 text-center">
                {activeTab === "login" ? "Escolha um método para entrar" : "Crie sua conta com"}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleSocialLogin(provider.id)}
                    disabled={isLoading}
                    className={`${provider.color} p-3 rounded-lg font-medium text-sm transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-2`}
                  >
                    <span className="text-xl">{provider.icon}</span>
                    <span>{provider.name}</span>
                    <span className="text-xs opacity-75">{provider.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/5 text-foreground/50 backdrop-blur-sm">
                  ou
                </span>
              </div>
            </div>

            {/* Default Manus Login */}
            <Button
              onClick={handleDefaultLogin}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Entrar com Email
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Info Message */}
        <Card className="backdrop-blur-xl bg-primary/10 border-primary/20 p-4 text-center">
          <p className="text-sm text-primary/80">
            {activeTab === "login" 
              ? "Não tem conta? Clique em 'Cadastro' acima"
              : "Já tem conta? Clique em 'Entrar' acima"
            }
          </p>
        </Card>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl mb-2">🎮</div>
            <p className="text-xs text-foreground/60">Games</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl mb-2">🎬</div>
            <p className="text-xs text-foreground/60">Vlogs</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl mb-2">🍿</div>
            <p className="text-xs text-foreground/60">Em Breve</p>
          </div>
        </div>
      </div>
    </div>
  );
}
