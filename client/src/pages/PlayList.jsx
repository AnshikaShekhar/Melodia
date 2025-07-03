import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [editStates, setEditStates] = useState({}); // { playlistId: { isEditing: boolean, newName: string } }

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/playlists", {
         headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleRename = async (playlistId) => {
    const { newName } = editStates[playlistId];
    if (!newName.trim()) return;
    try {
      await axios.patch(
        `http://localhost:4000/api/playlists/${playlistId}`,
        { name: newName.trim() },
        { headers }
      );
      setEditStates((prev) => ({
        ...prev,
        [playlistId]: { isEditing: false, newName: "" },
      }));
      fetchPlaylists();
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  const handleDeleteSong = async (playlistId, songId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/playlists/${playlistId}/songs/${songId}`,
        { headers }
      );
      fetchPlaylists();
    } catch (err) {
      console.error("Delete song failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f0c29] via-[#1a1a3d] to-[#2a2a72] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-repeat">
      {/* Background Vinyl Overlay */}
      <div className="absolute inset-0 opacity-10 z-0"></div>

     

      <main className="flex-1 p-6 sm:p-12 relative z-10">
        <h1 className="text-5xl font-bold mb-12 text-center text-teal-300 tracking-wide drop-shadow-lg animate-pulse-slow">
          🎵 My Curated Playlists
        </h1>

        {playlists.length === 0 ? (
          <div className="flex justify-center items-center h-72 bg-[#1e1e3f]/50 rounded-xl backdrop-blur-md">
            <p className="text-xl text-gray-300 italic animate-fade-in">
              You haven't created any playlists yet. 🎶 Go explore some music!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playlists.map((playlist) => {
              const isEditing = editStates[playlist._id]?.isEditing || false;
              const newName =
                editStates[playlist._id]?.newName || playlist.name;

              return (
                <div
                  key={playlist._id}
                  className="bg-[#2d2d5f]/80 p-6 rounded-2xl border border-teal-800/50 shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-6 relative">
                    {isEditing ? (
                      <div className="flex items-center space-x-4 w-full">
                        <input
                          value={newName}
                          onChange={(e) =>
                            setEditStates((prev) => ({
                              ...prev,
                              [playlist._id]: {
                                isEditing: true,
                                newName: e.target.value,
                              },
                            }))
                          }
                          className="bg-gray-800/70 text-white px-4 py-2 rounded-lg border border-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                          placeholder="Enter new playlist name"
                        />
                        <button
                          onClick={() => handleRename(playlist._id)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-200 text-white font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            setEditStates((prev) => ({
                              ...prev,
                              [playlist._id]: { isEditing: false, newName: "" },
                            }))
                          }
                          className="text-gray-400 hover:text-red-500 transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-3">
                        🎧 {playlist.name}
                        <button
                          onClick={() =>
                            setEditStates((prev) => ({
                              ...prev,
                              [playlist._id]: {
                                isEditing: true,
                                newName: playlist.name,
                              },
                            }))
                          }
                          className="text-yellow-400 hover:text-yellow-300 transition duration-200"
                        >
                          ✏️ Edit
                        </button>
                      </h2>
                    )}
                  </div>

                  {playlist.songs.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-4">
                      No songs in this playlist yet. 🎵
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {playlist.songs.map((song) => (
                        <li
                          key={song._id}
                          className="bg-[#3a3a6a]/70 p-4 rounded-xl hover:bg-[#4a4a8a]/70 transition duration-300 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-teal-200 font-semibold text-lg">
                              {song.title}
                            </span>
                            <span className="text-gray-400 text-sm">by</span>
                            <span className="text-pink-300 text-md">
                              {song.artist}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {song.genre?.toUpperCase()}
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteSong(playlist._id, song._id)
                              }
                              className="text-red-400 hover:text-red-300 transition duration-200"
                            >
                              ❌ Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <MusicPlayer />
    </div>
  );
}

export default PlaylistPage;