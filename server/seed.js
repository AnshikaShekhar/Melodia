const mongoose = require('mongoose');
const Song = require('./models/song');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://melodia:AH90XFs9xABUhlIi@melodia.woowq8n.mongodb.net/')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('Connection error:', err));

const sampleSongs = [
  {
    title: 'Luther',
    artist: 'Kendrick Lamar & SZA',
    audioUrl: 'https://example.com/songs/luther.mp3',
    genre: 'hip-hop',
    mood: 'intense',
    duration: 210,
    releaseDate: new Date('2025-06-01'),
    trendingScore: 98, // Billboard #1
  },
  {
    title: 'Die With a Smile',
    artist: 'Lady Gaga & Bruno Mars',
    audioUrl: 'https://example.com/songs/die-with-a-smile.mp3',
    genre: 'pop',
    mood: 'romantic',
    duration: 195,
    releaseDate: new Date('2025-05-15'),
    trendingScore: 96, // Hot 100 #2–1
  },
  {
    title: 'Not Like Us',
    artist: 'Kendrick Lamar',
    audioUrl: 'https://example.com/songs/not-like-us.mp3',
    genre: 'hip-hop',
    mood: 'aggressive',
    duration: 225,
    releaseDate: new Date('2025-06-10'),
    trendingScore: 94, // #3 US
  },
  {
    title: 'Apt.',
    artist: 'ROSÉ & Bruno Mars',
    audioUrl: 'https://example.com/songs/apt.mp3',
    genre: 'pop',
    mood: 'upbeat',
    duration: 180,
    releaseDate: new Date('2025-06-05'),
    trendingScore: 92, // #6 US
  },
  {
    title: 'Birds Of A Feather',
    artist: 'Billie Eilish',
    audioUrl: 'https://example.com/songs/birds-of-a-feather.mp3',
    genre: 'alternative',
    mood: 'emotional',
    duration: 200,
    releaseDate: new Date('2025-05-20'),
    trendingScore: 90, // Top 10
  },
  {
    title: 'Nokia',
    artist: 'Drake',
    audioUrl: 'https://example.com/songs/nokia.mp3',
    genre: 'rap',
    mood: 'confident',
    duration: 215,
    releaseDate: new Date('2025-06-15'),
    trendingScore: 88, // #10 US
  },
  {
    title: 'DTMF',
    artist: 'Bad Bunny',
    audioUrl: 'https://example.com/songs/dtmf.mp3',
    genre: 'reggaeton',
    mood: 'festive',
    duration: 230,
    releaseDate: new Date('2025-05-25'),
    trendingScore: 91, // Billboard Global top spots
  },
  {
    title: 'A Bar Song (Tipsy)',
    artist: 'Shaboozey',
    audioUrl: 'https://example.com/songs/a-bar-song.mp3',
    genre: 'country-rap',
    mood: 'fun',
    duration: 185,
    releaseDate: new Date('2025-06-01'),
    trendingScore: 89, // #5 US
  },
  {
    title: 'Lose Control',
    artist: 'Teddy Swims',
    audioUrl: 'https://example.com/songs/lose-control.mp3',
    genre: 'r&b',
    mood: 'passionate',
    duration: 190,
    releaseDate: new Date('2025-05-10'),
    trendingScore: 87, // #10 US
  },
  {
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    audioUrl: 'https://example.com/songs/espresso.mp3',
    genre: 'pop',
    mood: 'playful',
    duration: 175,
    releaseDate: new Date('2025-04-15'),
    trendingScore: 93, // Top 10
  },
  {
    title: 'Beautiful Things',
    artist: 'Benson Boone',
    audioUrl: 'https://example.com/songs/beautiful-things.mp3',
    genre: 'pop',
    mood: 'heartwarming',
    duration: 200,
    releaseDate: new Date('2025-05-01'),
    trendingScore: 85, // #12 US
  },
  {
    title: 'Timeless',
    artist: 'The Weeknd & Playboi Carti',
    audioUrl: 'https://example.com/songs/timeless.mp3',
    genre: 'r&b',
    mood: 'mysterious',
    duration: 220,
    releaseDate: new Date('2025-06-20'),
    trendingScore: 83, // #19 US
  },
  {
    title: 'Abracadabra',
    artist: 'Lady Gaga',
    audioUrl: 'https://example.com/songs/abracadabra.mp3',
    genre: 'pop',
    mood: 'magical',
    duration: 205,
    releaseDate: new Date('2025-06-10'),
    trendingScore: 86, // Top 20
  },
  {
    title: 'Cry For Me',
    artist: 'The Weeknd',
    audioUrl: 'https://example.com/songs/cry-for-me.mp3',
    genre: 'r&b',
    mood: 'sad',
    duration: 210,
    releaseDate: new Date('2025-05-25'),
    trendingScore: 84, // #<15 US
  },
  {
    title: 'Ordinary',
    artist: 'Alex Warren',
    audioUrl: 'https://example.com/songs/ordinary.mp3',
    genre: 'pop',
    mood: 'reflective',
    duration: 195,
    releaseDate: new Date('2025-06-15'),
    trendingScore: 82, // Rising contender
  },
  {
    title: 'Manchild',
    artist: 'Sabrina Carpenter',
    audioUrl: 'https://example.com/songs/manchild.mp3',
    genre: 'pop',
    mood: 'playful',
    duration: 180,
    releaseDate: new Date('2025-06-05'),
    trendingScore: 95, // Hot 100 #1
  },
  {
    title: 'Fairy',
    artist: 'Myaap',
    audioUrl: 'https://example.com/songs/fairy.mp3',
    genre: 'electronic',
    mood: 'dreamy',
    duration: 200,
    releaseDate: new Date('2025-06-01'),
    trendingScore: 88, // GQ Song-of-the-Summer
  },
  {
    title: 'Outside',
    artist: 'Cardi B',
    audioUrl: 'https://example.com/songs/outside.mp3',
    genre: 'hip-hop',
    mood: 'bold',
    duration: 225,
    releaseDate: new Date('2025-05-20'),
    trendingScore: 90, // GQ club anthem
  },
  {
    title: 'Party 4 U',
    artist: 'Charli XCX',
    audioUrl: 'https://example.com/songs/party-4-u.mp3',
    genre: 'pop',
    mood: 'festive',
    duration: 190,
    releaseDate: new Date('2025-06-10'),
    trendingScore: 87, // Vogue “Brat Summer” revival
  },
  {
    title: 'Mutt',
    artist: 'Leon Thomas',
    audioUrl: 'https://example.com/songs/mutt.mp3',
    genre: 'r&b',
    mood: 'soulful',
    duration: 215,
    releaseDate: new Date('2025-06-15'),
    trendingScore: 85, // Slow-burn summer hit
  },
  {
    title: 'Shake It to the Max',
    artist: 'MOLIY',
    audioUrl: 'https://example.com/songs/shake-it-to-the-max.mp3',
    genre: 'dance',
    mood: 'energetic',
    duration: 205,
    releaseDate: new Date('2025-06-01'),
    trendingScore: 86, // GQ dance-floor favorite
  },
  {
    title: 'Tonight',
    artist: 'PinkPantheress',
    audioUrl: 'https://example.com/songs/tonight.mp3',
    genre: 'hyperpop',
    mood: 'vibrant',
    duration: 180,
    releaseDate: new Date('2025-05-25'),
    trendingScore: 89, // Hyperpop dance-floor hit
  },
  {
    title: 'What Was That',
    artist: 'Lorde',
    audioUrl: 'https://example.com/songs/what-was-that.mp3',
    genre: 'alternative',
    mood: 'introspective',
    duration: 200,
    releaseDate: new Date('2025-06-20'),
    trendingScore: 84, // AP list inclusion
  },
  {
    title: 'Gnarly',
    artist: 'KATSEYE',
    audioUrl: 'https://example.com/songs/gnarly.mp3',
    genre: 'pop',
    mood: 'fun',
    duration: 190,
    releaseDate: new Date('2025-06-10'),
    trendingScore: 83, // Global pop influence
  },
  {
    title: 'WASSUP',
    artist: 'Young Miko',
    audioUrl: 'https://example.com/songs/wassup.mp3',
    genre: 'latin',
    mood: 'flirty',
    duration: 210,
    releaseDate: new Date('2025-05-15'),
    trendingScore: 92, // Flirty Gen-Z vibe
  },
  {
    title: 'Boots on the Ground',
    artist: '803Fresh',
    audioUrl: 'https://example.com/songs/boots-on-the-ground.mp3',
    genre: 'hip-hop',
    mood: 'gritty',
    duration: 225,
    releaseDate: new Date('2025-06-05'),
    trendingScore: 87, // TikTok hit
  },
  {
    title: 'Fame Is a Gun',
    artist: 'Addison Rae',
    audioUrl: 'https://example.com/songs/fame-is-a-gun.mp3',
    genre: 'pop',
    mood: 'dramatic',
    duration: 195,
    releaseDate: new Date('2025-06-01'),
    trendingScore: 88, // Vogue & AP summer preview
  },
  {
    title: 'Money Is Everything',
    artist: 'Addison Rae',
    audioUrl: 'https://example.com/songs/money-is-everything.mp3',
    genre: 'pop',
    mood: 'confident',
    duration: 185,
    releaseDate: new Date('2025-06-15'),
    trendingScore: 86, // “Girlhood anthem”
  },
  {
    title: 'Every Girl You’ve Ever Loved',
    artist: 'Miley Cyrus',
    audioUrl: 'https://example.com/songs/every-girl-youve-ever-loved.mp3',
    genre: 'pop',
    mood: 'nostalgic',
    duration: 200,
    releaseDate: new Date('2025-05-20'),
    trendingScore: 85, // Vogue pick
  },
  {
    title: 'End of the World',
    artist: 'Miley Cyrus',
    audioUrl: 'https://example.com/songs/end-of-the-world.mp3',
    genre: 'pop',
    mood: 'energetic',
    duration: 210,
    releaseDate: new Date('2025-06-10'),
    trendingScore: 87, // Energetic Vogue pick
  },
];

async function seedDatabase() {
  try {
    await Song.deleteMany(); // Clear existing data
    await Song.insertMany(sampleSongs);
    console.log('Database seeded with sample songs');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
}

seedDatabase();