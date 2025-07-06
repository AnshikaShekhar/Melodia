const express = require('express');
const router = express.Router();

const {
  getSongs,
  toggleLikeSong,
  getLikedSongs,
  getTrendingSongs,
  getPublicSongById,
} = require('../controllers/songController');

const authenticateUser = require('../middleware/authMiddleware');

// 🔓 Public route
router.get('/trending', getTrendingSongs); 

// 🔓 Public route
router.get('/', getSongs); 
router.get("/public/:id", getPublicSongById); // ✅

// 🔐 Protected routes
router.post('/:songId/like', authenticateUser, toggleLikeSong);
router.get('/liked', authenticateUser, getLikedSongs);

module.exports = router;
