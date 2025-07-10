import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";
import { FaHeart } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Use process.env for consistency

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      navigate("/home");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 mb-4 sm:mb-0">
          <img
            src="/waveform.png"
            alt="Melodia Logo"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full filter brightness-0 invert"
          />
          <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
            Melodia
          </span>
        </h1>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
          <Link
            to="/"
            className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
          >
            <i className="fas fa-home mr-2 hidden sm:inline"></i>Home
          </Link>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
          <Link
            to="/devpanel"
            className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
          >
            <i className="fas fa-home mr-2 hidden sm:inline"></i>Login As a Developer
          </Link>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        {/* Main content div classes now match Signup page */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between bg-[#1f1f3a]/90 p-8 rounded-2xl shadow-2xl border border-[#3a3a8a] backdrop-blur-md z-10 animate-fade-in border-4 border-teal-400/50">
          {/* Image section now matches Signup page */}
          <div className="hidden md:flex w-1/2 justify-center">
            <img
              src="/waveform.png" 
              alt="Music Icon"
              className="w-80 h-auto rounded-full filter brightness-0 invert"
            />
          </div>

          <div className="w-full md:w-1/2">
            {/* Heading emoji now matches Signup page */}
            <h1 className="text-4xl font-extrabold mb-6 text-teal-300 text-center">
              Login
            </h1>
            {error && (
              <p className="text-red-400 mb-4 text-center animate-shake">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-5"> {/* space-y-5 for consistency */}
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                required
              />
              {/* Forgot password link, kept as is, as it's login specific functionality */}
              <div className="flex justify-end text-sm text-white"> {/* Adjusted to justify-end */}
                <Link to="/forgotpassword" className="text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md hover:shadow-green-400/40 ${ /* Matched Signup button styles */
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login Now"}
              </button>
              <p className="text-center text-sm text-gray-300 mt-4">
                Not a member?{" "}
                <Link to="/signup" className="text-blue-400 hover:underline">
                  Sign up Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center z-10 relative animate-fade-in border-t border-purple-800 mt-auto">
        <p className="text-gray-400 text-lg">© 2025 Melodia. All rights reserved.</p>
        <p className="mt-4 text-gray-500 text-sm">
          Developed with <FaHeart className="inline text-red-500 mx-1" /> by:{" "}
          <span className="font-medium text-teal-300">Ayush Kumar</span> &{" "}
          <span className="font-medium text-teal-300">Anshika Shekhar</span>
        </p>
      </footer>
    </div>
  );
}

export default Login;