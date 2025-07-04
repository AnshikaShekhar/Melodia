import { useState, useEffect } from "react";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";
import Header from "./Header";
import { FaPlay, FaHeart, FaStar } from "react-icons/fa";

function HomePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [trendingSongs, setTrendingSongs] = useState([]);
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

    const fetchTrendingSongs = async () => {
      try {
        const response = await axios.get(`${baseURL}api/songs/trending`);
        setTrendingSongs(response.data.sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 5));
      } catch (err) {
        console.error("Error fetching trending songs:", err);
        const sampleSongs = [
          {
            title: "Espresso",
            artist: "Sabrina Carpenter",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdnZ2EKT3p7TTNn7h9XEmUb-LAASbwlisZA&s",
            audioUrl: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613873/Sabrina_Carpenter_-_Espresso_eVli-tstM5E_1_dsvm1o.mp3",
            genre: "pop",
            trendingScore: 93,
          },
          {
            title: "I Had Some Help",
            artist: "Post Malone ft. Morgan Wallen",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivYgM412zi8r36MWVvCC_7gS6FG6BJAdCEQ&s",
            audioUrl: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613711/Shaboozey_-_A_Bar_Song_Tipsy_Official_Visualizer_t7bQwwqW-Hc_p7c9z6.mp3",
            genre: "country-rap",
            trendingScore: 89,
          },
          {
            title: "Not Like Us",
            artist: "Kendrick Lamar",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKhVmdXl7HMpNew_ukSnW1J-AHuKL9ttXxCg&s",
            audioUrl: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613248/Kendrick_Lamar_-_Not_Like_Us_H58vbez_m4E_fshd5l.mp3",
            genre: "hip-hop",
            trendingScore: 94,
          },
          {
            title: "Die With a Smile",
            artist: "Lady Gaga & Bruno Mars",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVHYXtm6qFO-wc7bCDDKfe2I1BlLEap1y3mQ&s",
            audioUrl: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613145/Lady_Gaga_Bruno_Mars_-_Die_With_A_Smile_Official_Music_Video_kPa7bsKwL-c_mb4xqz.mp3",
            genre: "pop",
            trendingScore: 96,
          },
          {
            title: "Luther",
            artist: "Kendrick Lamar & SZA",
            image: "https://i1.sndcdn.com/artworks-y6WaHzlvp7PbwkLT-JlZicw-t500x500.png",
            audioUrl: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751612924/Kendrick_Lamar_-_luther_Spider-Verse_e8oehi.mp3",
            genre: "hip-hop",
            trendingScore: 98,
          },
        ];
        setTrendingSongs(sampleSongs);
      }
    };

    fetchUsername();
    fetchTrendingSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a4d] to-[#2a2a72] text-white font-sans overflow-hidden relative">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-24 px-4 relative overflow-hidden animate-fadeIn">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-10"></div>
        <h2 className="text-5xl font-bold text-teal-200 mb-6 animate-slideInGlow">
          Welcome Back, {username || "Guest"}
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 animate-fadeInUp">
          Stream your favorite tunes, curate custom playlists, and discover fresh sounds with Melodia.
        </p>
        <a
          href="/explore"
          className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg animate-pulse"
        >
          <FaPlay className="mr-2" /> Start Listening
        </a>
      </section>

      {/* Trending Songs */}
      <section className="py-16 px-6 relative">
        <h3 className="text-4xl font-semibold text-center text-teal-200 mb-12 animate-bounceIn">
          🔥 Trending Songs
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
          {trendingSongs.map((song, index) => (
            <div
              key={song.title}
              className="bg-[#2a5298] hover:bg-[#203e6e] transition-all duration-300 p-6 rounded-xl shadow-2xl transform hover:-translate-y-2 hover:scale-105 hover:shadow-glow border border-teal-900/20 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={song.image}
                alt={`${song.title} cover`}
                className="w-full h-56 object-cover rounded-md mb-4 transition-opacity duration-300 hover:opacity-90"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x224?text=Image+Not+Available";
                }}
              />
              <h4 className="text-xl font-semibold text-teal-100 mb-1 flex items-center">
                {song.title} <FaStar className="ml-2 text-yellow-400 animate-twinkle" />
              </h4>
              <p className="text-gray-300 text-sm flex items-center">
                {song.artist} <FaHeart className="ml-2 text-red-500 animate-heartbeat" />
              </p>
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