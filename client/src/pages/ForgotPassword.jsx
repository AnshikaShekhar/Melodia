import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const baseURL = "http://localhost:4000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${baseURL}api/auth/forgotpassword`, formData);
      setMessage(
        "Password has been changed successfully! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <div
        className="max-w-lg w-full p-8 rounded-lg shadow-lg"
        style={{ background: "linear-gradient(135deg, #525252, #3d72b4)" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 p-3 rounded hover:bg-purple-700 transition duration-200 text-white font-semibold"
          >
            Reset Password
          </button>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {message && (
            <p className="text-green-400 mb-4 text-center">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
