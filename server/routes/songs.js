const express = require('express');
const router = express.Router();

const {
  getSongs,
  toggleLikeSong,
  getLikedSongs,
  getTrendingSongs,
} = require('../controllers/songController');

const authenticateUser = require('../middleware/authMiddleware');

// 🔓 Public route
router.get('/trending', getTrendingSongs); 

// 🔓 Public route
router.get('/', getSongs); 

// 🔐 Protected routes
router.post('/:songId/like', authenticateUser, toggleLikeSong);
router.get('/liked', authenticateUser, getLikedSongs);

module.exports = router;
