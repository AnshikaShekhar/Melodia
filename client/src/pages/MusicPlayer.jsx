import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MusicPlayer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1e1e2f] border-t border-gray-700 z-50">
      <div className="flex items-center justify-between px-6 py-4 text-white">
        {/* Song Info + Image */}
        <div className="w-1/3 flex items-center space-x-4">
          <img
            src="/images3.jpg" // Replace with dynamic data if needed
            alt="Now Playing"
            className="w-14 h-14 rounded object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold">Not Like Us</h4>
            <p className="text-sm text-gray-400">Kendrick Lamar</p>
          </div>
        </div>

        {/* Controls + Seek Bar */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center space-x-6 text-xl">
            <button className="hover:text-blue-400">
              <i className="fas fa-backward"></i>
            </button>
            <button className="hover:text-green-400 text-2xl">
              <i className="fas fa-play-circle"></i>
            </button>
            <button className="hover:text-blue-400">
              <i className="fas fa-forward"></i>
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="30"
            className="w-full mt-2 accent-teal-500"
          />
        </div>

        {/* Volume */}
        <div className="flex items-center justify-end space-x-3 w-1/3">
          <i className="fas fa-volume-up"></i>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="75"
            className="accent-teal-500"
          />
        </div>
      </div>
    </footer>
  );
}

export default MusicPlayer;
