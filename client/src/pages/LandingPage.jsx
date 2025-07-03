function LandingPage() {
  const trendingSongs = [
    { id: 1, title: 'Espresso', artist: 'Sabrina Carpenter', genre: 'Pop', image: '/images.png' },
    { id: 2, title: 'I Had Some Help', artist: 'Post Malone ft. Morgan Wallen', genre: 'Country-Pop', image: '/images2.jpeg' },
    { id: 3, title: 'Not Like Us', artist: 'Kendrick Lamar', genre: 'Hip-Hop', image: '/images3.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      {/* Animated Vinyl Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-contain bg-no-repeat animate-spin-slow opacity-20 top-10 left-10"></div>
        <div className="absolute w-60 h-60 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-contain bg-no-repeat animate-spin-reverse opacity-15 bottom-10 right-10"></div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center py-6 px-6 z-10 relative animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-300 drop-shadow-md">Melodia</h1>
        <div className="space-x-4">
          <a href="/login" className="bg-blue-700 hover:bg-blue-600 px-6 py-3 rounded-xl transition duration-300 text-white font-medium shadow-md hover:shadow-blue-500/50">
            Login
          </a>
          <a href="/signup" className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-xl transition duration-300 text-white font-medium shadow-md hover:shadow-green-500/50">
            Sign Up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 z-10 relative animate-slide-in">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-teal-200 drop-shadow-[0_4px_6px_rgba(0,255,255,0.3)] animate-pulse-glow">
          Discover Your Music
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
          Stream your favorite tunes, curate custom playlists, and discover fresh sounds with Melodia 🎶
        </p>
        <a href="/signup" className="bg-purple-700 hover:bg-purple-600 px-8 py-3 rounded-full text-lg md:text-xl font-semibold transition duration-300 text-white shadow-md hover:shadow-purple-500/50 animate-bounce-slow">
          Get Started
        </a>
      </section>

      {/* Trending Songs Preview */}
      <section className="py-16 z-10 relative animate-fade-in-up">
        <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-teal-200 text-center drop-shadow-md">
          Trending Songs 🎵
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {trendingSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#2d2d6f]/70 p-6 rounded-2xl border-2 border-teal-900/50 shadow-[0_0_15px_rgba(0,200,255,0.1)] hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm relative overflow-hidden group animate-fade-in"
            >
              <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
              <img
                src={song.image}
                alt={`${song.title} cover`}
                className="w-full h-64 object-cover rounded-t-xl mb-4 animate-scale-up"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="w-full h-64 flex items-center justify-center bg-gray-700 rounded-t-xl mb-4 text-white" style={{ display: 'none' }} id={`fallback-${song.id}`}>
                {song.title} Image
              </div>
              <h4 className="text-xl font-semibold text-teal-200 truncate">{song.title}</h4>
              <p className="text-gray-400 truncate">{song.artist}</p>
              <p className="text-sm text-gray-500 truncate">{song.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 z-10 bg-[#1e1e4f]/70 backdrop-blur-md text-center relative animate-fade-in-up">
        <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-teal-200 drop-shadow-md">
          What Users Say 🌟
        </h3>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { id: 1, text: "Melodia transformed my music experience!", name: "Alex P." },
            { id: 2, text: "Amazing playlists and easy to use!", name: "Sam K." },
          ].map((review) => (
            <div
              key={review.id}
              className="bg-[#2d2d6f]/70 p-6 rounded-2xl border-2 border-teal-900/50 shadow-[0_0_15px_rgba(0,200,255,0.1)] hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm relative overflow-hidden group animate-fade-in"
            >
              <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
              <p className="text-gray-300">{review.text}</p>
              <p className="mt-4 text-teal-200 font-semibold">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 z-10 text-center relative animate-fade-in-up">
        <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-teal-200 drop-shadow-md">
          About Us 🎧
        </h3>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Melodia is a passion project designed to revolutionize how you experience music. Our team, Ayush Kumar and Anshika Shekhar, is dedicated to creating a seamless platform where you can stream your favorite tracks, craft personalized playlists, and discover new artists. Built with love and cutting-edge technology, Melodia aims to bring music lovers together in a vibrant community.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center z-10 bg-[#1e1e4f]/70 backdrop-blur-md relative animate-fade-in">
        <p className="text-gray-400">© 2025 Melodia. All rights reserved.</p>
        <p className="mt-4 text-gray-500 text-sm">Developed by: Ayush Kumar, Anshika Shekhar</p>
      </footer>
    </div>
  );
}

export default LandingPage;