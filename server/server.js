const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playListRoutes');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.use('/api/auth', authRoutes);
app.use('/api/songs', authenticateToken, songRoutes);
app.use('/api/playlists', authenticateToken, playlistRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://melodia:AH90XFs9xABUhlIi@melodia.woowq8n.mongodb.net/';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const userDataRoutes = require("./routes/userDataRoutes");
app.use("/api/user", userDataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});