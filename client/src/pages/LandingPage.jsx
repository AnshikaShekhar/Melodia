import { Link } from 'react-router-dom';

function LandingPage() {
  const trendingSongs = [
    { id: 1, title: 'Song One', artist: 'Artist A', genre: 'Pop' },
    { id: 2, title: 'Song Two', artist: 'Artist B', genre: 'Rock' },
    { id: 3, title: 'Song Three', artist: 'Artist C', genre: 'Hip-Hop' },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">Melodia</h1>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16">
        <h2 className="text-5xl font-bold mb-4">Discover Your Music</h2>
        <p className="text-xl mb-8">Stream, create playlists, and explore new music with Melodia.</p>
        <Link to="/signup" className="bg-purple-600 px-6 py-3 rounded-full text-lg hover:bg-purple-700">
          Get Started
        </Link>
      </section>

      {/* Trending Songs Preview */}
      <section className="py-8">
        <h3 className="text-2xl font-semibold mb-4">Trending Songs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trendingSongs.map((song) => (
            <div key={song.id} className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">{song.title}</h4>
              <p className="text-gray-400">{song.artist}</p>
              <p className="text-gray-400">{song.genre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;