import React, { useState, useEffect } from 'react';

export const ProgressLoading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-bounce">
            <span className="text-4xl">🎮</span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          MasterPllays
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Carregando experiência premium...
        </p>

        {/* Barra de progresso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Inicializando...</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Dicas aleatórias */}
        <div className="text-center text-gray-400 text-sm mt-8 animate-pulse">
          Dica: Explore nossa coleção exclusiva de jogos e vídeos!
        </div>
      </div>
    </div>
  );
};
