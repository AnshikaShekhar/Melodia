const express = require('express');
const Playlist = require('../models/playlist');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = new Playlist({ name, user: req.user._id });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist' });
  }
});

module.exports = router;