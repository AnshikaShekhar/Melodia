// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./index.css";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import ExplorePage from "./pages/ExplorePage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PlaylistPage from "./pages/PlayList";
import Header from "./pages/Header";

function AppContent() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Only show Header when NOT on the landing page
  const shouldShowHeader = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {shouldShowHeader && <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/explore"
          element={token ? <ExplorePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/playlist"
          element={token ? <PlaylistPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
