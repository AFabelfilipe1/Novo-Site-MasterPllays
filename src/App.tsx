import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import VideoPlayer from './pages/VideoPlayer';
import MoviesComingSoon from './pages/MoviesComingSoon';
import AdminDashboard from './pages/AdminDashboard';
import AdminUpload from './pages/AdminUpload';
import AboutPage from './pages/AboutPage';
import GamesPage from './pages/GamesPage';
import VlogsPage from './pages/VlogsPage';
import NotFound from './pages/NotFound';
import Layout from './components/layout'; // Verifique se o caminho está correto
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/auth" element={<AuthPage/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/watch/:id" element={<VideoPlayer/>} />
              <Route path="/movies" element={<MoviesComingSoon/>} />
              <Route path="/admin" element={<AdminDashboard/>} />
              <Route path="/admin/upload" element={<AdminUpload/>} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/games" element={<GamesPage/>} />
              <Route path="/vlogs" element={<VlogsPage/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
