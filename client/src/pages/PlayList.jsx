import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./Header";
import MusicPlayer from "./MusicPlayer";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [editStates, setEditStates] = useState({}); // { playlistId: { isEditing: boolean, newName: string } }

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPlaylists = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
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
        {
          headers,
        }
      );
      fetchPlaylists();
    } catch (err) {
      console.error("Delete song failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <Header />

      <main className="flex-1 p-8 sm:px-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-teal-300 tracking-wide drop-shadow-md">
          🎵 My Curated Playlists
        </h1>

        {playlists.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-lg text-gray-400 italic">
              You haven't created any playlists yet. Go explore some music! 🎧
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {playlists.map((playlist) => {
              const isEditing = editStates[playlist._id]?.isEditing || false;
              const newName =
                editStates[playlist._id]?.newName || playlist.name;

              return (
                <div
                  key={playlist._id}
                  className="bg-[#1e1e2f] p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
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
                          className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
                        />
                        <button
                          onClick={() => handleRename(playlist._id)}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
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
                          className="text-sm text-gray-300 hover:text-red-400"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
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
                          className="text-sm ml-2 text-yellow-300 hover:text-yellow-400"
                        >
                          ✏️ Edit
                        </button>
                      </h2>
                    )}
                  </div>

                  {playlist.songs.length === 0 ? (
                    <p className="text-gray-400">
                      No songs in this playlist yet.
                    </p>
                  ) : (
                    <ul className="space-y-3 mt-2">
                      {playlist.songs.map((song) => (
                        <li
                          key={song._id}
                          className="bg-[#2f2f45] p-3 rounded-lg hover:bg-[#3b3b5a] transition duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                        >
                          <div>
                            <span className="text-teal-100 font-medium text-lg">
                              {song.title}
                            </span>{" "}
                            <span className="text-gray-400 text-sm">by</span>{" "}
                            <span className="text-pink-300 text-md">
                              {song.artist}
                            </span>
                          </div>

                          <div className="flex justify-between sm:items-center gap-4 mt-2 sm:mt-0">
                            <span className="text-sm text-gray-400">
                              {song.genre?.toUpperCase()}
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteSong(playlist._id, song._id)
                              }
                              className="text-sm text-red-400 hover:text-red-500"
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
