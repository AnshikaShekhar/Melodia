const express = require('express');
const Song = require('../models/song');
const router = express.Router();

// @route   GET /api/songs
// @desc    Fetch songs with live search and filters
router.get('/', async (req, res) => {
  try {
    const { search, genre, artist, mood, durationMin, durationMax, page = 1, limit = 10 } = req.query;
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

    // Duration filter (convert to seconds if provided in minutes)
    if (durationMin || durationMax) {
      query.duration = {};
      if (durationMin) query.duration.$gte = parseInt(durationMin) * 60; // Convert minutes to seconds
      if (durationMax) query.duration.$lte = parseInt(durationMax) * 60; // Convert minutes to seconds
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch songs with pagination
    const songs = await Song.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ trendingScore: -1 }); // Sort by trending score (descending)

    // Get total count for pagination metadata
    const total = await Song.countDocuments(query);

    res.json({
      songs,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

module.exports = router;