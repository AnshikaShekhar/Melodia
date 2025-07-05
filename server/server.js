const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playListRoutes');
const userDataRoutes = require("./routes/userDataRoutes");
const authenticateUser = require('./middleware/authMiddleware'); // ✅ use your middleware

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', authenticateUser, songRoutes);       // ✅ Protected
app.use('/api/playlists', authenticateUser, playlistRoutes); // ✅ Protected
app.use("/api/user", userDataRoutes);                      // You can protect this too if needed

// MongoDB Connection
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://melodia:AH90XFs9xABUhlIi@melodia.woowq8n.mongodb.net/';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
