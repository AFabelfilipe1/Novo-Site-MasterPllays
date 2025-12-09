import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Bell, User, Menu, Gamepad2, Video, Film, X, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Novo video disponivel", message: "Confira o novo gameplay de Elden Ring", type: "info", timestamp: new Date(Date.now() - 5 * 60000) },
    { id: 2, title: "Video enviado com sucesso", message: "Seu video foi processado e esta ao vivo", type: "success", timestamp: new Date(Date.now() - 30 * 60000) },
  ]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "Agora";
    if (minutes < 60) return `${minutes}m atras`;
    if (hours < 24) return `${hours}h atras`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Games", path: "/games", icon: Gamepad2 },
    { label: "Vlogs", path: "/vlogs", icon: Video },
    { label: "Filmes & Series", path: "/movies", icon: Film, badge: "Em Breve" },
    { label: "Saiba Mais", path: "/about" },
  ];

  const unreadCount = notifications.length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation Bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-primary">Master</span>Pllays
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                    location === item.path ? "text-white" : "text-white/60"
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5 focus-within:border-primary/50 focus-within:bg-white/10 transition-all">
              <Search className="w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 w-32 focus:w-48 transition-all ml-2"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-background/95 border-white/10 backdrop-blur-xl p-0">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-semibold text-white">Notificacoes</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif: any) => (
                      <div key={notif.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {notif.type === "success" ? (
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            )}
                            <p className="text-sm font-medium text-white">{notif.title}</p>
                          </div>
                          <p className="text-xs text-foreground/60 mt-1">{notif.message}</p>
                          <p className="text-xs text-foreground/40 mt-1">{formatTime(notif.timestamp)}</p>
                        </div>
                        <button onClick={() => removeNotification(notif.id)} className="text-white/40 hover:text-white transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-foreground/60">
                      <p className="text-sm">Nenhuma notificacao</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            {isAuthenticated && user ? (
              <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all">
                <User className="w-4 h-4" />
                <span className="text-sm text-white hidden sm:inline">{user.name || "Perfil"}</span>
              </Link>
            ) : (
              <Link href="/login" className="px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all">
                Entrar
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/10 z-40 md:hidden">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-lg transition-colors",
                  location === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ml-auto">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 mt-4">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Meu Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-center transition-colors"
                >
                  Entrar
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-0 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/5 py-12 mt-20 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                <span className="text-primary">Master</span>Pllays
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Sua plataforma definitiva para entretenimento digital. Games, vlogs e o melhor do cinema em um só lugar.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Games</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Vlogs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Filmes & Séries</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Social</h4>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">
              © 2025 MasterPllays. Todos os direitos reservados.
            </p>
            <p className="text-white/20 text-xs flex items-center gap-1">
              Feito com <span className="text-red-500">❤</span> para gamers e cinéfilos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
