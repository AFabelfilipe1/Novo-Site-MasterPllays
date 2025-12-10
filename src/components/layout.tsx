import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, ROUTES } from './const';
import { Button } from './ui/button';
import { useTheme } from './contexts/ThemeContext'; // Você precisará criar este hook

// Hook helper para ThemeContext (crie em ./contexts/ThemeContext.tsx)
// export const useTheme = () => React.useContext(ThemeContext);

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // const { theme, toggle } = useTheme(); // Descomente quando criar o hook
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-3 px-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="font-bold text-lg flex items-center gap-2">
          🎮 {APP_NAME}
        </Link>
        <nav className="flex items-center gap-4">
          <Link to={ROUTES.MOVIES} className="hover:text-blue-600 transition-colors">Movies</Link>
          <Link to={ROUTES.GAMES} className="hover:text-blue-600 transition-colors">Games</Link>
          <Link to={ROUTES.VLOGS} className="hover:text-blue-600 transition-colors">Vlogs</Link>
          {/* <Button variant="ghost" onClick={toggle} size="sm">
            {theme === 'light' ? '🌙' : '☀️'}
          </Button> */}
          <Link to={ROUTES.PROFILE}>
            <Button variant="ghost" size="sm">Profile</Button>
          </Link>
        </nav>
      </header>
      <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700">
        © {new Date().getFullYear()} {APP_NAME} - All rights reserved
      </footer>
    </div>
  );
};

export default Layout;
