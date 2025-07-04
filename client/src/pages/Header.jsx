import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    console.log("Logging out and navigating to /");
    navigate("/");
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-8 py-5 bg-gradient-to-r from-[#1e1e2f] via-[#2a2a40] to-[#1e1e2f] shadow-lg border-b border-gray-800">
      <h1 className="text-4xl font-extrabold text-white tracking-wide flex items-center gap-3">
        <img
          src="/waveform.png"
          alt="Melodia Logo"
            className="w-10 h-10 rounded-full filter invert brightness-0"
        />
        <span className="bg-gradient-to-r from-teal-300 to-cyan-400 text-transparent bg-clip-text">
          Melodia
        </span>
      </h1>

      <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
        <Link
          to="/home"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          Home
        </Link>

        <Link
          to="/explore"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          Explore Music
        </Link>

        <Link
          to="/playlist"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          My Playlists
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;