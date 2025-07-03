const mongoose = require("mongoose");
const Song = require("./models/song");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://melodia:AH90XFs9xABUhlIi@melodia.woowq8n.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("Connection error:", err));

const sampleSongs = [
  {
    title: "Luther",
    artist: "Kendrick Lamar & SZA",
    image:
      "https://i1.sndcdn.com/artworks-y6WaHzlvp7PbwkLT-JlZicw-t500x500.png",
    audioUrl: "https://example.com/songs/luther.mp3",
    genre: "hip-hop",
    mood: "intense",
    duration: 210,
    releaseDate: new Date("2025-06-01"),
    trendingScore: 98,
  },
  {
    title: "Die With a Smile",
    artist: "Lady Gaga & Bruno Mars",
    image: "https://via.placeholder.com/500x500?text=Die+With+a+Smile",
    audioUrl: "https://example.com/songs/die-with-a-smile.mp3",
    genre: "pop",
    mood: "romantic",
    duration: 195,
    releaseDate: new Date("2025-05-15"),
    trendingScore: 96,
  },
  {
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    image: "https://via.placeholder.com/500x500?text=Not+Like+Us",
    audioUrl: "https://example.com/songs/not-like-us.mp3",
    genre: "hip-hop",
    mood: "aggressive",
    duration: 225,
    releaseDate: new Date("2025-06-10"),
    trendingScore: 94,
  },
  {
    title: "Apt.",
    artist: "ROSÉ & Bruno Mars",
    image: "https://via.placeholder.com/500x500?text=Apt",
    audioUrl: "https://example.com/songs/apt.mp3",
    genre: "pop",
    mood: "upbeat",
    duration: 180,
    releaseDate: new Date("2025-06-05"),
    trendingScore: 92,
  },
  {
    title: "Birds Of A Feather",
    artist: "Billie Eilish",
    image: "https://via.placeholder.com/500x500?text=Birds+Of+A+Feather",
    audioUrl: "https://example.com/songs/birds-of-a-feather.mp3",
    genre: "alternative",
    mood: "emotional",
    duration: 200,
    releaseDate: new Date("2025-05-20"),
    trendingScore: 90,
  },
  {
    title: "Nokia",
    artist: "Drake",
    image: "https://via.placeholder.com/500x500?text=Nokia",
    audioUrl: "https://example.com/songs/nokia.mp3",
    genre: "rap",
    mood: "confident",
    duration: 215,
    releaseDate: new Date("2025-06-15"),
    trendingScore: 88,
  },
  {
    title: "DTMF",
    artist: "Bad Bunny",
    image: "https://via.placeholder.com/500x500?text=DTMF",
    audioUrl: "https://example.com/songs/dtmf.mp3",
    genre: "reggaeton",
    mood: "festive",
    duration: 230,
    releaseDate: new Date("2025-05-25"),
    trendingScore: 91,
  },
  {
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    image: "https://via.placeholder.com/500x500?text=Tipsy",
    audioUrl: "https://example.com/songs/a-bar-song.mp3",
    genre: "country-rap",
    mood: "fun",
    duration: 185,
    releaseDate: new Date("2025-06-01"),
    trendingScore: 89,
  },
  {
    title: "Lose Control",
    artist: "Teddy Swims",
    image: "https://via.placeholder.com/500x500?text=Lose+Control",
    audioUrl: "https://example.com/songs/lose-control.mp3",
    genre: "r&b",
    mood: "passionate",
    duration: 190,
    releaseDate: new Date("2025-05-10"),
    trendingScore: 87,
  },
  {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    image: "https://via.placeholder.com/500x500?text=Espresso",
    audioUrl: "https://example.com/songs/espresso.mp3",
    genre: "pop",
    mood: "playful",
    duration: 175,
    releaseDate: new Date("2025-04-15"),
    trendingScore: 93,
  },
  {
    title: "Beautiful Things",
    artist: "Benson Boone",
    image: "https://via.placeholder.com/500x500?text=Beautiful+Things",
    audioUrl: "https://example.com/songs/beautiful-things.mp3",
    genre: "pop",
    mood: "heartwarming",
    duration: 200,
    releaseDate: new Date("2025-05-01"),
    trendingScore: 85,
  },
  {
    title: "Timeless",
    artist: "The Weeknd & Playboi Carti",
    image: "https://via.placeholder.com/500x500?text=Timeless",
    audioUrl: "https://example.com/songs/timeless.mp3",
    genre: "r&b",
    mood: "mysterious",
    duration: 220,
    releaseDate: new Date("2025-06-20"),
    trendingScore: 83,
  },
  {
    title: "Abracadabra",
    artist: "Lady Gaga",
    image: "https://via.placeholder.com/500x500?text=Abracadabra",
    audioUrl: "https://example.com/songs/abracadabra.mp3",
    genre: "pop",
    mood: "magical",
    duration: 205,
    releaseDate: new Date("2025-06-10"),
    trendingScore: 86,
  },
  {
    title: "Cry For Me",
    artist: "The Weeknd",
    image: "https://via.placeholder.com/500x500?text=Cry+For+Me",
    audioUrl: "https://example.com/songs/cry-for-me.mp3",
    genre: "r&b",
    mood: "sad",
    duration: 210,
    releaseDate: new Date("2025-05-25"),
    trendingScore: 84,
  },
  {
    title: "Ordinary",
    artist: "Alex Warren",
    image: "https://via.placeholder.com/500x500?text=Ordinary",
    audioUrl: "https://example.com/songs/ordinary.mp3",
    genre: "pop",
    mood: "reflective",
    duration: 195,
    releaseDate: new Date("2025-06-15"),
    trendingScore: 82,
  },
];

async function seedDatabase() {
  try {
    await Song.deleteMany();
    await Song.insertMany(sampleSongs);
    console.log("Database seeded with sample songs");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
}

seedDatabase();
