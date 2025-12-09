import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, LogOut, ArrowLeft, User, Mail, Calendar, Shield } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  useEffect(() => {
    // Se o usuário não está autenticado, redireciona para login
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, loading, setLocation]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLocation("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-foreground/60">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
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
            onClick={() => setLocation("/")}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-display font-bold text-white">
            Meu Perfil
          </h1>
        </div>

        {/* Profile Card */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-8 mb-6">
          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name || "Usuário"}</h2>
                <p className="text-foreground/60">{user.loginMethod}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground/60">Email</span>
                </div>
                <p className="text-white font-medium">{user.email || "Não informado"}</p>
              </div>

              {/* Role */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground/60">Tipo de Conta</span>
                </div>
                <p className="text-white font-medium capitalize">
                  {user.role === "admin" ? "Administrador" : "Usuário"}
                </p>
              </div>

              {/* Member Since */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground/60">Membro desde</span>
                </div>
                <p className="text-white font-medium">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              {/* Last Sign In */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Loader2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground/60">Último acesso</span>
                </div>
                <p className="text-white font-medium">
                  {formatDistanceToNow(new Date(user.lastSignedIn), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Account Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Ações da Conta</h3>
              
              <Button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full bg-destructive hover:bg-destructive/90 text-white rounded-lg h-12 font-semibold text-base"
              >
                {logoutMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Desconectando...
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5 mr-2" />
                    Fazer Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Message */}
        <Card className="backdrop-blur-xl bg-primary/10 border-primary/20 p-4">
          <p className="text-sm text-primary/80">
            💡 Dica: Seus dados de perfil são sincronizados automaticamente com sua conta Manus.
          </p>
        </Card>
      </div>
    </div>
  );
}
