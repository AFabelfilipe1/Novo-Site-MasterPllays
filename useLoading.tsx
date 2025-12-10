import React from 'react';

export const useLoading = (initialState = true) => {
  const [isLoading, setIsLoading] = React.useState(initialState);

  React.useEffect(() => {
    // Simula o carregamento (remova isto em produção)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de loading

    // Em produção, use:
    // window.addEventListener('load', () => setIsLoading(false));
    
    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};
