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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751549675/e0f8cb5825dbfaf9dd18f5e093eac039_wyqz9w.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751549931/images_k2pqim.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550160/Ros%C3%A9_and_Bruno_Mars_-_Apt._bkwum7.png",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550219/images_1_nuulsg.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550254/images_2_u3vsdd.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550294/images_3_qzjqk4.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550326/images_4_mllv7a.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550358/images_5_uu1k6o.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550386/images_6_ep8okj.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550491/images_7_xojfsu.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550524/images_8_cuon6x.jpg",
    audioUrl: "https://example.com/songs/timeless.mp3",
    genre: "r&b",
    mood: "mysterious",
    duration: 220,
    releaseDate: new Date("2025-06-20"),
    trendingScore: 83,
  },
 {
  title: "Midnight Sky",
  artist: "Miley Cyrus",
  image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550638/11download_vo9yph.jpg",
  audioUrl: "https://example.com/songs/midnight-sky.mp3",
  genre: "pop-rock",
  mood: "empowering",
  duration: 204,
  releaseDate: new Date("2025-06-12"),
  trendingScore: 88,
},

  {
    title: "Cry For Me",
    artist: "The Weeknd",
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550682/images_9_lwddol.jpg",
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
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550724/maxresdefault_sosh8y.jpg",
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
