jsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/core/hooks/useAuth";

export default function Login() {
  // Access the location setter from wouter
  const [, setLocation] = useLocation();
  // Access user authentication data and loading state from the useAuth hook
  const { user, isAuthenticated, loading } = useAuth();
  // State to manage the loading state of the OAuth login button
  const [isLoading, setIsLoading] = useState(false);

  // useEffect hook to redirect authenticated users to the home page
  useEffect(() => {
    // Redirect to home if the user is authenticated and user data is available
    if (isAuthenticated && user) {
      setLocation("/");
    }
    // Dependency array: effect runs when isAuthenticated, user, or setLocation changes
  }, [isAuthenticated, user, setLocation]);

  // Function to handle OAuth login
  const handleOAuthLogin = () => {
    // Set isLoading to true to show loading state
    setIsLoading(true);
    // Redirect the user to the OAuth login URL
    window.location.href = getLoginUrl();
  };

  // Render loading state UI
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/ Loading spinner /}
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          {/ Loading text /}
          <p className="text-foreground/60">Carregando...</p>
        </div>
      </div>
    );
  }

  // Render the login form
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/ Background Effects /}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/ Logo/Header /}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Master<span className="text-primary">Pllays</span>
          </h1>
          <p className="text-foreground/60">Bem-vindo de volta</p>
        </div>

        {/ Login Card /}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-8 mb-6">
          <div className="space-y-6">
            {/ OAuth Login /}
            <div>
              {/ OAuth Login Button /}
              <Button
                onClick={handleOAuthLogin}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? (
                  <>
                    {/ Loading spinner inside the button /}
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  <>
                    {/ Login icon and text /}
                    <LogIn className="w-5 h-5 mr-2" />
                    Entrar com Manus
                  </>
                )}
              </Button>
            </div>

            {/ Divider /}
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

            {/ Email/Password Demo (Placeholder) /}
            <div className="space-y-4">
              <div className="relative">
                {/ Mail Icon /}
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-foreground/40" />
                {/ Email Input /}
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-foreground/40 rounded-lg h-12 focus:border-primary/50 focus:ring-primary/20"
                  disabled
                />
              </div>
              <div className="relative">
                {/ Lock Icon /}
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-foreground/40" />
                {/ Password Input /}
                <Input
                  type="password"
                  placeholder="Sua senha"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-foreground/40 rounded-lg h-12 focus:border-primary/50 focus:ring-primary/20"
                  disabled
                />
              </div>
              {/ Email Login Button (Disabled) /}
              <Button
                disabled
                className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg h-12 font-semibold text-base border border-white/20"
              >
                Entrar com Email
              </Button>
              {/ Email/Password Coming Soon Text /}
              <p className="text-xs text-foreground/40 text-center">
                Email/Senha em breve
              </p>
            </div>
          </div>
        </Card>

        {/ Sign Up Link /}
        <div className="text-center">
          <p className="text-foreground/60">
            Novo por aqui?{" "}
            {/ Sign Up Button (reusing OAuth for now) /}
            <button
              onClick={handleOAuthLogin}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Criar conta
            </button>
          </p>
        </div>

        {/ Features /}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            {/ Game Icon /}
            <div className="text-2xl mb-2">🎮</div>
            {/ Game Text /}
            <p className="text-xs text-foreground/60">Games</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            {/ Vlog Icon /}
            <div className="text-2xl mb-2">🎬</div>
            {/ Vlog Text /}
            <p className="text-xs text-foreground/60">Vlogs</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            {/ Coming Soon Icon /}
            <div className="text-2xl mb-2">🍿</div>
            {/ Coming Soon Text /}
            <p className="text-xs text-foreground/60">Em Breve</p>
          </div>
        </div>
      </div>
    </div>
  );
}
