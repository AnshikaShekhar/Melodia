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
    image: "https://i.pinimg.com/736x/e0/f8/cb/e0f8cb5825dbfaf9dd18f5e093eac039.jpg",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mBQTajMRwz7xYNLFq7drqv6sh3b41nm4Qg&s",
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
    image: "https://upload.wikimedia.org/wikipedia/en/5/52/Ros%C3%A9_and_Bruno_Mars_-_Apt..png",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOMrb8NTRYnFn7JZrtw0X55yap4-Jonhn0w&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6dsESYuy5Kf8vap-wh5MwHAfhPcEXSYpOAg&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-e5Z6eaPu3kxumgxABP_1o_7PtTwggn4E6g&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWV0PcPP1g4yG69uWOZnxzTZY4B9QfJIGFaTiWAAi2R_-29Nh61d4UChAEj-JtFdYbPk&usqp=CAU",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWP6mqd4QuEQ2lkIgZytRJHzpBFRe4PNV3BQ&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdOoFRqVzXExIchV3n1nzHOs22s3hxZPWijw&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfLmmvqr_uTs8UrRq-HkaD0oDIbZBhDG28g&s",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAZ-ziwmXEZZWZH7RbVAUvTe9oz9fSN1x4A&s",
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
    image: "https://external-preview.redd.it/inside-the-mayhem-of-lady-gagas-abracadabra-music-video-v0-G86fbzXmEge74HW6yTUKfvIFLRQrXtlI_urylWCrsMg.jpg?width=1080&crop=smart&auto=webp&s=6911f2dbb051afe8cc89902237b87b314ef3c358",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1i-WgYUK-fmvWrsk_fXRFY6OQeAqKyL76A&s",
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
    image: "https://i.ytimg.com/vi/byxFUKxhT3s/maxresdefault.jpg",
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
