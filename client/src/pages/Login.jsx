import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const baseURL = "http://localhost:5000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${baseURL}api/auth/login`, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate('/home');
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full p-8 rounded-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #525252, #3d72b4)' }}>
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <div className="flex justify-end text-sm text-white">
            <Link to="/forgotpassword" className="text-blue-300 hover:underline">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 p-3 rounded hover:bg-purple-700 transition duration-200 text-white font-semibold"
          >
            Login Now
          </button>
          <p className="text-center text-white text-sm mt-4">
            Not a member? <a href="/signup" className="text-blue-300 hover:underline">Sign up Now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;