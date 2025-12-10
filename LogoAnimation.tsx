import React from 'react';

export const LogoAnimation: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-45 animate-[bounce_1.5s_ease-in-out_infinite]"></div>
          <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎮</span>
          </div>
        </div>
        
        {/* Texto com animação de digitação */}
        <div className="text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Master<span className="animate-[pulse_1s_ease-in-out_infinite]">P</span>llays
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-[bounce_1s_infinite]"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
            <span className="text-gray-600 ml-2">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
