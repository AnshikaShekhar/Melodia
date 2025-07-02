import React, { useRef, useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const playlist = [
  {
    id: 1,
    title: "Sample Song 1",
    artist: "Artist A",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "/images.jpg",
  },
  {
    id: 2,
    title: "Sample Song 2",
    artist: "Artist B",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: "/images2.jpg",
  },
];

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = playlist[currentIndex];

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) =>
        console.warn("Autoplay blocked:", err.message)
      );
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleBackDoubleClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
    setProgress(0);
    setIsPlaying(false);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setProgress(seekTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load(); // load new source
    setProgress(0);
    setIsPlaying(false); // wait for user to play
  }, [currentIndex]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1e1e2f] border-t border-gray-700 z-50">
      <audio ref={audioRef} src={currentSong.src} preload="auto" />

      <div className="flex items-center justify-between px-6 py-4 text-white">
        {/* Song Info */}
        <div className="w-1/3 flex items-center space-x-4">
          <img
            src={currentSong.image}
            alt="song"
            className="w-14 h-14 rounded object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold">{currentSong.title}</h4>
            <p className="text-sm text-gray-400">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls & Progress */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center space-x-6 text-xl mb-2">
            <button
              onClick={handleRestart}
              onDoubleClick={handleBackDoubleClick}
              className="hover:text-blue-400"
              title="Click: Restart • Double-click: Previous"
            >
              <i className="fas fa-backward"></i>
            </button>

            <button
              onClick={togglePlay}
              className="hover:text-green-400 text-2xl"
            >
              <i
                className={`fas ${
                  isPlaying ? "fa-pause-circle" : "fa-play-circle"
                }`}
              ></i>
            </button>

            <button onClick={nextSong} className="hover:text-blue-400">
              <i className="fas fa-forward"></i>
            </button>
          </div>

          <div className="flex items-center space-x-4 w-full">
            <span className="text-sm w-12 text-right text-gray-300">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="w-full accent-teal-500"
            />
            <span className="text-sm w-12 text-left text-gray-300">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end space-x-3 w-1/3">
          <i className="fas fa-volume-up"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="0.75"
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.volume = parseFloat(e.target.value);
              }
            }}
            className="accent-teal-500"
          />
        </div>
      </div>
    </footer>
  );
}

export default MusicPlayer;
