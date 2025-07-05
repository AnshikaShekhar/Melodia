import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MusicPlayer from "./MusicPlayer";
import Header from "./Header";
import { useMusic } from "./MusicContext";

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
  const { playSong, currentSong, isPlaying } = useMusic();

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
      alert(`🎵 "${song.title}" added to playlist successfully!`);
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
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white font-sans"
    >
      <Header />

      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="w-1/5 p-8 bg-gray-900 border-r border-gray-700 min-h-screen shadow-lg">
          <h2 className="text-2xl font-bold mb-8 text-purple-300">🎧 Filters</h2>

          <div className="mb-8">
            <label htmlFor="genre-filter" className="block text-sm mb-3 text-gray-300 font-semibold">Genre</label>
            <select
              id="genre-filter"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 appearance-none custom-select"
            >
              <option value="">All Genres</option>
              {uniqueGenres.map((genre, i) => (
                <option key={i} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="artist-filter" className="block text-sm mb-3 text-gray-300 font-semibold">Artist</label>
            <select
              id="artist-filter"
              value={artistFilter}
              onChange={(e) => setArtistFilter(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 appearance-none custom-select"
            >
              <option value="">All Artists</option>
              {uniqueArtists.map((artist, i) => (
                <option key={i} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="sort-by" className="block text-sm mb-3 text-gray-300 font-semibold">Sort By</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 appearance-none custom-select"
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
        <main className="flex-1 p-10 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="flex justify-between items-center mb-10">
            <input
              type="text"
              placeholder="🔍 Search songs..."
              className="flex-grow p-4 rounded-full bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="ml-8">
              {showPlaylistInput ? (
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New Playlist Name"
                    className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleCreatePlaylist}
                    className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
                  >
                    <span className="mr-2">➕</span> Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPlaylistInput(true)}
                  className="bg-purple-600 px-8 py-3 rounded-lg hover:bg-purple-700 transition duration-200 shadow-md flex items-center justify-center"
                >
                  <span className="mr-2">✨</span> Create Playlist
                </button>
              )}
            </div>
          </div>

          {/* Songs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {songs.map((song) => (
              <motion.div
                key={song._id}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group relative"
              >
                <div className="relative w-full h-48 sm:h-56 rounded-t-xl overflow-hidden">
                  <img
                    src={song.image}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() =>
                        playSong(
                          songs,
                          songs.findIndex((s) => s._id === song._id)
                        )
                      }
                      className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition duration-200 text-2xl flex items-center justify-center transform hover:scale-110"
                      aria-label={currentSong && currentSong._id === song._id && isPlaying ? "Pause song" : "Play song"}
                    >
                      {currentSong && currentSong._id === song._id && isPlaying
                        ? "⏸️"
                        : "▶️"}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-1 text-purple-200 truncate">
                    {song.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-2 truncate">{song.artist}</p>
                  <p className="text-xs text-gray-500 mb-4">{song.genre}</p>

                  {playlists.length > 0 && (
                    <div className="relative z-10">
                      <button
                        onClick={() => toggleDropdown(song._id)}
                        className="w-full bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm flex items-center justify-center mt-2"
                      >
                        ➕ Add to Playlist
                      </button>

                      {visibleDropdowns[song._id] && (
                        <select
                          className="absolute w-full mt-2 p-2 bg-gray-700 text-white rounded-lg shadow-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 z-20"
                          onChange={(e) =>
                            handleAddToPlaylist(song, e.target.value)
                          }
                          defaultValue=""
                          onClick={(e) => e.stopPropagation()}
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
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {songs.length === 0 && (
              <p className="col-span-full text-center text-gray-500 text-lg py-10">
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
