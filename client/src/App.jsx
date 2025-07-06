import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import PlaylistPage from "./pages/PlayList";
import Library from "./pages/Library";

import { MusicProvider } from "./pages/MusicContext";
import MusicPlayer from "./pages/MusicPlayer"; 

import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function AppContent() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/explore" element={token ? <ExplorePage /> : <Navigate to="/login" />} />
      <Route path="/playlist" element={token ? <PlaylistPage /> : <Navigate to="/login" />} />
      <Route path="/library" element={token ? <Library /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <MusicProvider>
        <AppContent />
        <MusicPlayer /> 
      </MusicProvider>
    </Router>
  );
}

export default App;
