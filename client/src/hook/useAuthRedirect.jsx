import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // install if not done: npm i jwt-decode

const useRoleRedirect = ({ allowedRoles = [] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Optional: check expiry
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        navigate("/");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate, allowedRoles]);
};

export default useRoleRedirect;
