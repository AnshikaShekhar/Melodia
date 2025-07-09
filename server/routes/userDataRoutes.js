const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleWare");
const User = require("../models/User");
const Playlist = require("../models/playlist");

router.get("/fetchusername", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("username email createdAt likedSongs bio role")
      .populate("likedSongs", "title genre artist");

    if (!user) return res.status(404).json({ message: "User not found" });

    const playlists = await Playlist.find({ userId: req.user.id });

    res.status(200).json({ ...user._doc, playlists });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update", verifyToken, async (req, res) => {
  const { username, bio } = req.body;

  if (username && username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters long." });
  }

  try {
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (bio !== undefined) updatedFields.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      { new: true, runValidators: true }
    ).select("username bio");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
