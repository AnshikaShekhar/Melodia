import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', cover: null, songs: [] });
  const [activeTab, setActiveTab] = useState('playlists');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [playlistsRes, likedRes] = await Promise.all([
        axios.get('http://localhost:4000/api/playlists', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:4000/api/likes', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setPlaylists(playlistsRes.data);
      setLikedSongs(likedRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setNewPlaylist({ ...newPlaylist, cover: acceptedFiles[0] }),
  });

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newPlaylist.name);
      if (newPlaylist.cover) formData.append('cover', newPlaylist.cover);
      await axios.post('http://localhost:4000/api/playlists', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setNewPlaylist({ name: '', cover: null, songs: [] });
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error('Failed to delete playlist:', error);
    }
  };

  const handleSmartPlaylist = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.get('http://localhost:4000/api/smart-playlists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error('Failed to generate smart playlist:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Library</h1>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab('playlists')}
          className={`p-2 rounded ${activeTab === 'playlists' ? 'bg-blue-600' : 'bg-gray-600'}`}
        >
          Playlists
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`p-2 rounded ${activeTab === 'liked' ? 'bg-blue-600' : 'bg-gray-600'}`}
        >
          Liked Songs
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 p-2 rounded hover:bg-green-700"
        >
          Create Playlist
        </button>
        <button
          onClick={handleSmartPlaylist}
          className="bg-purple-600 p-2 rounded hover:bg-purple-700"
        >
          🎧 Generate Smart Playlist
        </button>
      </div>
      {activeTab === 'playlists' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="bg-gray-800 p-4 rounded-lg relative">
              <h2 className="text-lg font-semibold">{playlist.name}</h2>
              <button
                onClick={() => handleDeletePlaylist(playlist._id)}
                className="absolute top-2 right-2 bg-red-600 p-1 rounded hover:bg-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'liked' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedSongs.map((song) => (
            <div key={song._id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">New Playlist</h2>
            <form onSubmit={handleCreatePlaylist}>
              <input
                type="text"
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                placeholder="Playlist Name"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                required
              />
              <div {...getRootProps()} className="border-2 border-dashed p-2 mb-2">
                <input {...getInputProps()} />
                <p>Drag 'n' drop cover image, or click to select</p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 bg-red-600 p-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 p-2 rounded hover:bg-blue-700">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;