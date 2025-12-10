import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Logo animado */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-8 animate-pulse">
          <span className="text-3xl font-bold text-white">🎮</span>
        </div>
        
        {/* Spinner */}
        <div className="absolute -inset-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Texto */}
      <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-2">MasterPllays</h1>
      <p className="text-gray-600">Carregando sua diversão...</p>
      
      {/* Barra de progresso */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-8">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
