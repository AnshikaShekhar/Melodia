import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${baseURL}api/auth/signup`, formData);
      alert(response.data.message || "Signup successful!");
      navigate('/login');
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full p-8 rounded-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #525252, #3d72b4)' }}>
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
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
          <button
            type="submit"
            className="w-full bg-green-600 p-3 rounded hover:bg-green-700 transition duration-200 text-white font-semibold"
          >
            Sign Up
          </button>
          <p className="text-center text-white text-sm mt-4">
            Already a member? <a href="/login" className="text-blue-300 hover:underline">Login Now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
