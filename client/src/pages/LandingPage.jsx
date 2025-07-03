function LandingPage() {
  const trendingSongs = [
    { id: 1, title: 'Espresso', artist: 'Sabrina Carpenter', genre: 'Pop', image: '/images.png' },
    { id: 2, title: 'I Had Some Help', artist: 'Post Malone ft. Morgan Wallen', genre: 'Country-Pop', image: '/images2.jpeg' },
    { id: 3, title: 'Not Like Us', artist: 'Kendrick Lamar', genre: 'Hip-Hop', image: '/images3.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative overflow-hidden bg-[url('https://via.placeholder.com/150/0000FF/808080?text=Vinyl+Spin')] bg-no-repeat bg-center bg-fixed animate-bg-spin">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-6 z-10">
        <h1 className="text-4xl font-bold text-teal-200">Melodia</h1>
        <div className="space-x-4">
          <a href="/login" className="bg-blue-700 px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300 text-white">
            Login
          </a>
          <a href="/signup" className="bg-green-700 px-6 py-3 rounded-lg hover:bg-green-800 transition duration-300 text-white">
            Sign Up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 z-10">
        <h2 className="text-6xl font-extrabold mb-8 text-teal-100">Discover Your Music</h2>
        <p className="text-2xl mb-12 text-gray-200">Stream your favorite tunes, curate custom playlists, and discover fresh sounds with Melodia</p>
        <a href="/signup" className="bg-purple-700 px-10 py-4 rounded-full text-xl font-semibold hover:bg-purple-800 transition duration-300 text-white">
          Get Started
        </a>
      </section>

      {/* Trending Songs Preview */}
      <section className="py-16 z-10">
        <h3 className="text-3xl font-semibold mb-8 text-teal-100">Trending Songs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {trendingSongs.map((song) => (
            <div key={song.id} className="bg-[#2a5298] p-6 rounded-xl shadow-xl hover:bg-[#214282] transition duration-300">
              <img src={song.image} alt={`${song.title} cover`} className="w-full h-64 object-cover rounded-t-xl mb-4" onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="w-full h-64 flex items-center justify-center bg-gray-700 rounded-t-xl mb-4 text-white" style={{ display: 'none' }} id={`fallback-${song.id}`}>
                {song.title} Image
              </div>
              <h4 className="text-xl font-semibold text-teal-100">{song.title}</h4>
              <p className="text-gray-300">{song.artist}</p>
              <p className="text-gray-300">{song.genre}</p>
            </div>
          ))}
        </div>
      </section>
      

      {/* Testimonials */}
      <section className="py-16 z-10 bg-[#1e3a8a] text-center">
        <h3 className="text-3xl font-semibold mb-8 text-teal-100">What Users Say</h3>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { id: 1, text: "Melodia transformed my music experience!", name: "Alex P." },
            { id: 2, text: "Amazing playlists and easy to use!", name: "Sam K." },
          ].map((review) => (
            <div key={review.id} className="bg-[#2a5298] p-6 rounded-xl">
              <p className="text-gray-300">{review.text}</p>
              <p className="mt-4 text-teal-100 font-semibold">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 z-10 text-center">
        <h3 className="text-3xl font-semibold mb-8 text-teal-100">About Us</h3>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Melodia is a passion project designed to revolutionize how you experience music. Our team is dedicated to creating a seamless platform where you can stream your favorite tracks, craft personalized playlists, and discover new artists. Built with love and cutting-edge technology, Melodia aims to bring music lovers together in a vibrant community.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center z-10 bg-[#1e3a8a]">
        <p className="text-gray-400">© 2025 Melodia. All rights reserved.</p>
        <p className="mt-4 text-gray-500 text-sm">Developed by: Ayush Kumar , Anshika Shekhar</p> {/* Replace with actual names */}
      </footer>
    </div>
  );
}

export default LandingPage;