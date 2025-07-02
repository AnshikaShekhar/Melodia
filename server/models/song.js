const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audioUrl: { type: String, required: true }, // URL for Howler.js streaming
  genre: { type: String, required: true }, // For filtering
  mood: { type: String, required: true }, // For filtering
  duration: { type: Number, required: true },
  releaseDate: { type: Date, default: Date.now }, // For new releases
  trendingScore: { type: Number, default: 0 }, // For trending songs
  image: { type: String, required: true },
});

module.exports = mongoose.model("Song", songSchema);
