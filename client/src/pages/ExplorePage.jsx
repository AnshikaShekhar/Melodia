import { useState, useEffect } from "react";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";
import Header from "./Header";

function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
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
            mood: moodFilter,
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
  }, [searchQuery, genreFilter, artistFilter, moodFilter, sortBy]);

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
  const uniqueMoods = [...new Set(songs.map((song) => song.mood))];

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
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      {/* Animated Vinyl Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-contain bg-no-repeat animate-spin-slow opacity-20 top-10 left-10"></div>
        <div className="absolute w-60 h-60 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-contain bg-no-repeat animate-spin-reverse opacity-15 bottom-10 right-10"></div>
      </div>

      <Header />

      <div className="flex relative z-10">
        {/* Sidebar Filters */}
        <aside className="w-1/5 p-6 bg-[#1e1e3f]/70 backdrop-blur-md border-r border-teal-900/30 min-h-screen shadow-lg animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-teal-300 drop-shadow-md">
            🎧 Filters
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Genre
              </label>
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800/60 text-white border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              >
                <option value="">All Genres</option>
                {uniqueGenres.map((genre, i) => (
                  <option key={i} value={genre} className="bg-gray-800">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Artist
              </label>
              <select
                value={artistFilter}
                onChange={(e) => setArtistFilter(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800/60 text-white border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              >
                <option value="">All Artists</option>
                {uniqueArtists.map((artist, i) => (
                  <option key={i} value={artist} className="bg-gray-800">
                    {artist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mood
              </label>
              <select
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800/60 text-white border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              >
                <option value="">All Moods</option>
                {uniqueMoods.map((mood, i) => (
                  <option key={i} value={mood} className="bg-gray-800">
                    {mood}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800/60 text-white border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              >
                <option value="">Default</option>
                <option value="newest" className="bg-gray-800">
                  📅 Release Date (Newest)
                </option>
                <option value="oldest" className="bg-gray-800">
                  📅 Release Date (Oldest)
                </option>
                <option value="shortest" className="bg-gray-800">
                  ⏱️ Duration (Short → Long)
                </option>
                <option value="longest" className="bg-gray-800">
                  ⏱️ Duration (Long → Short)
                </option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-5rem)] relative">
          <div className="flex justify-between mb-8 items-center animate-slide-in">
            <input
              type="text"
              placeholder="🔍 Search songs..."
              className="w-2/3 p-4 rounded-xl bg-gray-800/70 text-white border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="ml-6">
              {showPlaylistInput ? (
                <div className="flex space-x-4 items-center animate-fade-in">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New Playlist Name"
                    className="p-3 rounded-xl bg-gray-800/70 text-white border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={handleCreatePlaylist}
                    className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded-xl transition duration-300 text-white font-medium shadow-md hover:shadow-green-500/50"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPlaylistInput(true)}
                  className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-xl transition duration-300 text-white font-semibold shadow-md hover:shadow-purple-500/50"
                >
                  + Create Playlist
                </button>
              )}
            </div>
          </div>

          {/* Songs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {songs.map((song) => (
              <div
                key={song._id}
                className="bg-[#2d2d6f]/70 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,200,255,0.3)] transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
              >
                {/* Glowing Accent */}
                <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                <img
                  src={song.image}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  alt={song.title}
                  className="w-full h-60 object-cover rounded-t-xl animate-fade-in"
                />
                <div className="p-4 relative z-10">
                  <h4 className="text-xl font-semibold text-teal-200 truncate">
                    {song.title}
                  </h4>
                  <p className="text-gray-400 truncate">{song.artist}</p>
                  <p className="text-sm text-gray-500 truncate">{song.genre}</p>

                  {playlists.length > 0 && (
                    <>
                      <button
                        onClick={() => toggleDropdown(song._id)}
                        className="w-full bg-blue-600 hover:bg-blue-500 mt-4 p-2 rounded-xl transition duration-300 text-white font-medium animate-pulse-slow"
                      >
                        ➕ Add to Playlist
                      </button>

                      {visibleDropdowns[song._id] && (
                        <select
                          className="w-full mt-2 p-3 bg-gray-800/60 text-white rounded-xl border border-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                          onChange={(e) => handleAddToPlaylist(song, e.target.value)}
                          defaultValue=""
                        >
                          <option value="" disabled className="bg-gray-800">
                            Select playlist
                          </option>
                          {playlists.map((playlist) => (
                            <option
                              key={playlist._id}
                              value={playlist._id}
                              className="bg-gray-800"
                            >
                              {playlist.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {songs.length === 0 && (
              <p className="col-span-full text-center text-gray-400 text-xl italic animate-bounce">
                No songs found. Try adjusting your filters. 🎵
              </p>
            )}
          </div>
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default ExplorePage;