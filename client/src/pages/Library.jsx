import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import { useMusic } from './MusicContext'; // adjust path if necessary

function Library() {
  const [likedSongs, setLikedSongs] = useState([]);
  const token = localStorage.getItem('token');
  const { playSong, currentSong, isPlaying } = useMusic();

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  const fetchLikedSongs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/songs/liked', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikedSongs(response.data.likedSongs || []);
    } catch (err) {
      console.error('Failed to load liked songs:', err);
    }
  };

  const handleSmartPlaylist = async () => {
    try {
      await axios.get('http://localhost:4000/api/smart-playlists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Smart playlist generated!');
    } catch (err) {
      console.error('Smart playlist error:', err);
      alert('❌ Failed to generate smart playlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white font-sans"
    >
      <Header />

      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-300">💖 Liked Songs</h1>

          <button
            onClick={handleSmartPlaylist}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
          >
            🎧 Generate Smart Playlist
          </button>
        </div>

        {likedSongs.length === 0 ? (
          <motion.p
            className="text-gray-400"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            You haven’t liked any songs yet.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likedSongs.map((song, index) => (
              <motion.div
                key={song._id}
                onClick={() => playSong(likedSongs, likedSongs.findIndex((s) => s._id === song._id))}
                className="cursor-pointer bg-gray-800 p-5 rounded-xl border border-purple-500 shadow-lg hover:shadow-purple-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative group">
                  <img
                    src={song.image}
                    onError={(e) => (e.target.src = '/fallback.jpg')}
                    alt={song.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-purple-600 text-white p-3 rounded-full text-xl">
                      {currentSong && currentSong._id === song._id && isPlaying ? '⏸️' : '▶️'}
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-purple-200">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
                <p className="text-xs text-gray-500 mt-1 italic">{song.genre}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

   
      <div>
        <MusicPlayer />
      </div>
    </motion.div>
  );
}

export default Library;
