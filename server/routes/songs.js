const express = require('express');
const router = express.Router();

const {
  getSongs,
  toggleLikeSong,
  getLikedSongs,
} = require('../controllers/songController');

const authenticateUser = require('../middleware/authMiddleware');

// @route   GET /api/songs
// @desc    Get all songs with filters
router.get('/', getSongs);

// @route   POST /api/songs/:songId/like
// @desc    Like or unlike a song
router.post('/:songId/like', authenticateUser, toggleLikeSong);

// @route   GET /api/songs/liked
// @desc    Get all liked songs for the user
router.get('/liked', authenticateUser, getLikedSongs);

module.exports = router;
