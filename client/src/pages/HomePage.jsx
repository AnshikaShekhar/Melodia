import { useState, useEffect } from "react";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";

const trendingSongs = [
  {
    id: 1,
    title: "Espresso",
    artist: "Sabrina Carpenter",
    genre: "Pop",
    image: "/images.png",
  },
  {
    id: 2,
    title: "I Had Some Help",
    artist: "Post Malone ft. Morgan Wallen",
    genre: "Country-Pop",
    image: "/images2.jpeg",
  },
  {
    id: 3,
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    genre: "Hip-Hop",
    image: "/images3.jpg",
  },
];

function HomePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const baseURL = "http://localhost:4000/";

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}api/user/fetchusername`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error("Error fetching username:", err);
        setError("Couldn't fetch username.");
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* Removed <Header /> here, as it's now in App.jsx */}

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-teal-100 leading-snug">
          {username ? `Welcome Back, ${username}` : error}
        </h2>
        <p className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
          Stream your favorite tunes, curate custom playlists, and discover
          fresh sounds with Melodia.
        </p>
        <a
          href="/explore"
          className="inline-block bg-purple-700 hover:bg-purple-800 text-lg font-semibold px-8 py-3 rounded-full transition duration-300"
        >
          Click to Start Listening
        </a>
      </section>

      {/* Trending Songs */}
      <section className="py-16 px-6">
        <h3 className="text-3xl sm:text-4xl font-semibold text-center text-teal-200 mb-12">
          🔥 Trending Songs
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {trendingSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#2a5298] hover:bg-[#203e6e] transition duration-300 p-5 rounded-xl shadow-xl"
            >
              <img
                src={song.image}
                alt={`${song.title} cover`}
                className="w-full h-56 object-cover rounded-md mb-4"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h4 className="text-xl font-semibold text-teal-100 mb-1">
                {song.title}
              </h4>
              <p className="text-gray-300 text-sm">{song.artist}</p>
              <p className="text-gray-400 text-sm">{song.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default HomePage;