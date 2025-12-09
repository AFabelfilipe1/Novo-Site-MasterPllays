import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import VideoPlayer from "./pages/VideoPlayer";
import MoviesComingSoon from "./pages/MoviesComingSoon";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUpload from "./pages/AdminUpload";
import AboutPage from "./pages/AboutPage";
import GamesPage from "./pages/GamesPage";
import VlogsPage from "./pages/VlogsPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={AuthPage} />
      <Route path={"/signup"} component={AuthPage} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/watch/:id"} component={VideoPlayer} />
      <Route path={"/movies"} component={MoviesComingSoon} />
      <Route path={"/games"} component={GamesPage} />
      <Route path={"/vlogs"} component={VlogsPage} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/upload"} component={AdminUpload} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;