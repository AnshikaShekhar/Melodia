const express = require('express');
const Song = require('../models/song');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, genre, artist, mood, duration } = req.query;
    let query = {};

    // Live search by title or artist
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
      ];
    }

    // Apply filters
    if (genre) query.genre = genre;
    if (artist) query.artist = { $regex: artist, $options: 'i' };
    if (mood) query.mood = mood;
    if (duration) query.duration = { $lte: parseInt(duration) };

    const songs = await Song.find(query);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

module.exports = router;