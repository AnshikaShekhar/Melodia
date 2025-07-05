// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./index.css";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import ExplorePage from "./pages/ExplorePage";
import PlaylistPage from "./pages/PlayList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MusicProvider } from "./pages/MusicContext"; // ⬅️ wrap provider

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
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </Router>
  );
}

export default App;
