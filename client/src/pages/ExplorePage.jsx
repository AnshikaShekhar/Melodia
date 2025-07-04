import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MusicPlayer from "./MusicPlayer";
import Header from "./Header";

function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [visibleDropdowns, setVisibleDropdowns] = useState({});

  const SONGS_API = "http://localhost:4000/api/songs";
  const PLAYLIST_API = "http://localhost:4000/api/playlists";

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(SONGS_API, {
          params: {
            search: searchQuery,
            genre: genreFilter,
            artist: artistFilter,
            sortBy,
            limit: 50,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        setSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [searchQuery, genreFilter, artistFilter, sortBy]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(PLAYLIST_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const uniqueGenres = [...new Set(songs.map((song) => song.genre))];
  const uniqueArtists = [...new Set(songs.map((song) => song.artist))];

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        PLAYLIST_API,
        { name: newPlaylistName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlaylists([...playlists, response.data]);
      setNewPlaylistName("");
      setShowPlaylistInput(false);
    } catch (err) {
      console.error("Error creating playlist:", err);
    }
  };

  const toggleDropdown = (songId) => {
    setVisibleDropdowns((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  const handleAddToPlaylist = async (song, playlistId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${PLAYLIST_API}/${playlistId}/add`,
        { songId: song._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`\uD83C\uDFB5 "${song.title}" added to playlist successfully!`);
      setVisibleDropdowns((prev) => ({ ...prev, [song._id]: false }));
    } catch (err) {
      console.error("Error adding song to playlist:", err);
      alert("Failed to add song. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans"
    >
      <Header />

      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="w-1/5 p-6 bg-[#1e1e2f] border-r border-gray-700 min-h-screen">
          <h2 className="text-xl font-semibold mb-6">🎧 Filters</h2>

          <div className="mb-6">
            <label className="block text-sm mb-2">Genre</label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            >
              <option value="">All Genres</option>
              {uniqueGenres.map((genre, i) => (
                <option key={i} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Artist</label>
            <select
              value={artistFilter}
              onChange={(e) => setArtistFilter(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            >
              <option value="">All Artists</option>
              {uniqueArtists.map((artist, i) => (
                <option key={i} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            >
              <option value="">Default</option>
              <option value="newest">📅 Release Date (Newest)</option>
              <option value="oldest">📅 Release Date (Oldest)</option>
              <option value="shortest">⏱️ Duration (Short → Long)</option>
              <option value="longest">⏱️ Duration (Long → Short)</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="flex justify-between mb-8 items-center">
            <input
              type="text"
              placeholder="🔍 Search songs..."
              className="w-2/3 p-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="ml-6">
              {showPlaylistInput ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex space-x-2"
                >
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New Playlist Name"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <button
                    onClick={handleCreatePlaylist}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowPlaylistInput(true)}
                  className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700"
                >
                  + Create Playlist
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {songs.map((song) => (
              <motion.div
                key={song._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-[#2a5298] rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={song.image}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  alt={song.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-teal-100">
                    {song.title}
                  </h4>
                  <p className="text-gray-300">{song.artist}</p>
                  <p className="text-sm text-gray-400">{song.genre}</p>

                  {playlists.length > 0 && (
                    <>
                      <button
                        onClick={() => toggleDropdown(song._id)}
                        className="w-full bg-blue-600 mt-4 p-2 rounded hover:bg-blue-700 transition duration-300 hover:scale-105"
                      >
                        ➕ Add to Playlist
                      </button>

                      {visibleDropdowns[song._id] && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2"
                        >
                          <select
                            className="w-full p-2 bg-gray-800 text-white rounded"
                            onChange={(e) =>
                              handleAddToPlaylist(song, e.target.value)
                            }
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select playlist
                            </option>
                            {playlists.map((playlist) => (
                              <option key={playlist._id} value={playlist._id}>
                                {playlist.name}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {songs.length === 0 && (
              <p className="col-span-full text-center text-gray-400 text-lg">
                No songs found. Try adjusting your filters.
              </p>
            )}
          </div>
        </main>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <MusicPlayer />
      </motion.div>
    </motion.div>
  );
}

export default ExplorePage;