import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Make sure you're using the correct token key
    navigate("/");
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-6 py-4 border-b border-gray-700 bg-[#1e1e2f] shadow-md">
      <h1 className="text-4xl font-extrabold text-teal-200 tracking-wider">
        🎶 Melodia
      </h1>

      <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
        <Link
          to="/home"
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/explore"
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
        >
          Explore Music
        </Link>

        <Link
          to="/playlist"
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
        >
          My Playlists
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
