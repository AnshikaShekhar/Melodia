const express = require('express');
const Song = require('../models/song');
const router = express.Router();

// @route   GET /api/songs
router.get('/', async (req, res) => {
  try {
    const { search, genre, artist, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre) query.genre = genre;
    if (artist) query.artist = { $regex: artist, $options: 'i' };

    let sortOptions = {};
    switch (sortBy) {
      case 'newest':
        sortOptions = { releaseDate: -1 };
        break;
      case 'oldest':
        sortOptions = { releaseDate: 1 };
        break;
      case 'shortest':
        sortOptions = { duration: 1 };
        break;
      case 'longest':
        sortOptions = { duration: -1 };
        break;
      default:
        sortOptions = {};
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const songs = await Song.find(query).sort(sortOptions).skip(skip).limit(parseInt(limit));
    const total = await Song.countDocuments(query);

    res.json({
      songs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

module.exports = router;
