import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/layout';
import LoadingScreen from './components/LoadingScreen';
import { useLoading } from './hooks/useLoading';

// Lazy loading para páginas (opcional, mas melhora performance)
const Home = lazy(() => import('./pages/Home'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Profile = lazy(() => import('./pages/Profile'));
const VideoPlayer = lazy(() => import('./pages/VideoPlayer'));
const MoviesComingSoon = lazy(() => import('./pages/MoviesComingSoon'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminUpload = lazy(() => import('./pages/AdminUpload'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const VlogsPage = lazy(() => import('./pages/VlogsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const App: React.FC = () => {
  const isLoading = useLoading();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/watch/:id" element={<VideoPlayer />} />
                <Route path="/movies" element={<MoviesComingSoon />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/upload" element={<AdminUpload />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/vlogs" element={<VlogsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
