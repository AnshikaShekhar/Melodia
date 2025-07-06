import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

function LandingPage() {
  const trendingSongs = [ /* ... */ ]; // your existing songs array

  const handleGetStarted = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    window.location.href = "/signup";
  };

  useEffect(() => {
    const createNoteOrIcon = () => {
      const el = document.createElement("div");
      const choose = Math.random() < 0.7 ? "🎵" : "🎧";
      el.innerText = choose;
      Object.assign(el.style, {
        position: "fixed",
        left: `${Math.random() * 100}vw`,
        bottom: "0px",
        fontSize: `${Math.random() * 24 + 16}px`,
        opacity: Math.random(),
        pointerEvents: "none",
        zIndex: 30,
        animation: "floatNote 5s linear forwards"
      });
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    };
    const id = setInterval(createNoteOrIcon, 250);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden">
      {/* Sparkle Particle */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-fade-in"></div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#1a1a4d] shadow-md border-b border-purple-900 sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold flex items-center gap-2">
          <img src="/waveform.png" alt="logo" className="w-10 h-10 invert" />
          <span className="bg-gradient-to-r from-teal-300 to-blue-500 text-transparent bg-clip-text">Melodia</span>
        </h1>
        <div className="flex gap-4">
          <a href="/login" className="btn-primary">Login</a>
          <a href="/signup" className="btn-secondary">Sign Up</a>
        </div>
      </header>

      {/* Side Images */}
      <img src="/side-music-left.png" className="absolute left-0 top-1/3 w-24 opacity-20 animate-floatSide" />
      <img src="/side-music-right.png" className="absolute right-0 bottom-1/3 w-24 opacity-20 animate-floatSideReverse" />

      {/* Hero */}
      <section className="text-center py-28 relative">
        <h2 className="text-6xl font-extrabold mb-4 animate-pulse-slow">Discover Your Music</h2>
        <p className="text-xl text-gray-300 mb-12">Stream, curate, explore with Melodia 🎶</p>
        <button onClick={handleGetStarted} className="btn-glow-lg">Get Started ✨</button>
      </section>

      {/* Suggested Songs */}
      <section className="py-16">
        <h3 className="text-4xl text-center mb-12">Suggested Songs 🎵</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
          {trendingSongs.map(song => (
            <div key={song.id}
                 onClick={() => window.location.href = "/login"}
                 className="group card-glow">
              <img src={song.image} alt="" className="rounded-xl mb-4 group-hover:scale-105 transition" />
              <h4>{song.title}</h4>
              <p className="text-gray-300">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#1e1e4f]/80 text-center">
        <h3 className="text-3xl mb-8">What Users Say 🌟</h3>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { id: 1, text: "Transformed my experience!", name: "Alex P." },
            { id: 2, text: "Amazing & easy to use!", name: "Sam K." },
          ].map(r => (
            <div key={r.id} className="quote-card">
              <p>“{r.text}”</p>
              <p className="mt-4">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-16 text-center mb-20">
        <h3 className="text-4xl mb-6">About Us 🎧</h3>
        <p className="max-w-2xl mx-auto">Melodia is a next-gen streaming platform built for music lovers...</p>
      </section>

      <footer className="py-6 text-center bg-[#1e1e4f]/80">© 2025 Melodia. All rights reserved.</footer>
    </div>
  );
}

export default LandingPage;
