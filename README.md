# 🎵 Melodia: Cloud Music & Smart Playlist Companion

Melodia is a full-featured **cloud-based music streaming platform** that empowers users to explore, stream, and manage music effortlessly. Inspired by platforms like **Spotify**, **SoundCloud**, and **Wynk**, Melodia integrates modern UI/UX, secure authentication, real-time music playback, and AI-powered smart playlists to enhance user experience.

---


## 📌 Features

### 👤 User Functionality
- Secure **JWT Authentication** (Login/Signup)
- Browse **Trending Songs**, **Genres**
- Create and manage **Personal Playlists**
- **Like** and **Share** songs and playlists
- **Smart AI Playlist** generation based on user history and mood
- Powerful **Search and Filter** options (Genre, Artist, Duration)
- Fixed **Bottom Music Player** with full playback controls
- Responsive, intuitive **User Interface**


---

## 🧠 AI-Generated Smart Playlist

Melodia uses an AI-based recommendation engine to auto-generate playlists tailored to users' tastes, analyzing their:
- Liked songs
- Listening history
- Preferred genres/moods

This makes music discovery seamless and personalized.

---

## 🖥️ Tech Stack

| Layer        | Tech Used |
|--------------|-----------|
| **Frontend** | React.js, Tailwind CSS, axios |
| **State Management** | Redux Toolkit |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth**     | JWT, Bcrypt |
| **Audio**    | HTML5 Audio API |
| **Cloud Storage** | Cloudinary |
| **Deployment** | Vercel|

---

## 📄 Pages & Components

### `/` Landing Page
- CTA buttons for Login/Signup
- Preview of platform features & trending songs

### `/signup` & `/login`
- Secure authentication with JWT
- Redirect to `/explore` after success

### `/explore`
- Discover trending songs, new releases
- Apply filters: genre, artist, mood

### `/search`
- Live search bar with filters
- Instant results with song cards and play buttons

### `/library`
- **Liked Songs**
- 🎧 **Generate Smart Playlist** button
- Create playlists, manage liked tracks

### `/My playlist`
- View specific playlist details
- Edit playlist, play all, or remove songs

### 🎶 Now Playing Component
- Always visible at bottom
- Controls: play/pause, next/previous,repeat
  
---
