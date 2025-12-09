import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Users, Zap, Shield, Globe, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 py-4">
          <div className="container mx-auto px-4 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Sobre <span className="text-primary">MasterPllays</span>
            </h1>
            <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
              Descubra a plataforma que está revolucionando o entretenimento digital com gameplays épicos, vlogs imersivos e em breve, filmes e séries exclusivas.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 bg-white/5 border-y border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">
                  Nossa Missão
                </h2>
                <p className="text-foreground/60 mb-4 leading-relaxed">
                  O MasterPllays foi criado com uma visão clara: oferecer uma plataforma de streaming premium onde criadores de conteúdo podem compartilhar suas melhores produções e fãs podem descobrir entretenimento de qualidade.
                </p>
                <p className="text-foreground/60 leading-relaxed">
                  Acreditamos que o futuro do entretenimento digital é descentralizado, criativo e focado na comunidade. Por isso, estamos construindo um espaço onde gamers, criadores de vlogs e cinéfilos possam se encontrar.
                </p>
              </div>
              <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Qualidade Premium</h3>
                      <p className="text-sm text-foreground/60">Conteúdo selecionado e de alta qualidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Comunidade Ativa</h3>
                      <p className="text-sm text-foreground/60">Conecte-se com outros fãs e criadores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Inovação Constante</h3>
                      <p className="text-sm text-foreground/60">Novos recursos e conteúdo regularmente</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">
              O Que Oferecemos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold text-white mb-3">Gameplays Épicos</h3>
                <p className="text-foreground/60">
                  Assista aos melhores gameplays, speedruns e momentos memoráveis de games clássicos e lançamentos.
                </p>
              </Card>

              <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all">
                <div className="text-4xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold text-white mb-3">Vlogs Imersivos</h3>
                <p className="text-foreground/60">
                  Conteúdo criativo e autêntico de criadores que você ama, diretamente na plataforma.
                </p>
              </Card>

              <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all">
                <div className="text-4xl mb-4">🍿</div>
                <h3 className="text-xl font-semibold text-white mb-3">Em Breve: Filmes & Séries</h3>
                <p className="text-foreground/60">
                  Estamos preparando um catálogo exclusivo de filmes e séries para em breve.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-white/5 border-y border-white/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Segurança</h3>
                  <p className="text-foreground/60">
                    Seus dados estão protegidos com as melhores práticas de segurança e privacidade.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Acessibilidade</h3>
                  <p className="text-foreground/60">
                    Conteúdo acessível para todos, em qualquer lugar, a qualquer momento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Play className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Criatividade</h3>
                  <p className="text-foreground/60">
                    Apoiamos criadores independentes e seu direito de criar livremente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Comunidade</h3>
                  <p className="text-foreground/60">
                    Construímos uma comunidade inclusiva e respeitosa de fãs e criadores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de fãs que já estão desfrutando do melhor entretenimento digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                  Explorar Conteúdo
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 border-t border-white/5 py-12 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-white/40 text-sm">
              © 2025 MasterPllays. Todos os direitos reservados.
            </p>
            <p className="text-white/20 text-xs mt-4">
              Feito com <span className="text-red-500">❤</span> para a comunidade de gamers e criadores
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}