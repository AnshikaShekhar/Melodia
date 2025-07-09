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

### 🛠 Admin Panel
- **Role-based access control**
- Upload new songs with metadata (title, artist, mood, genre, duration, release date)
- Cloud audio/image upload via **Cloudinary**
- Automatically calculate and store audio duration
- Visual progress bar for upload
- Manage genres dynamically from the existing database
- Optional AI assistance for smart metadata tagging (extendable)

---

## 🧠 AI-Generated Smart Playlist

Melodia uses an AI-based recommendation engine to auto-generate playlists tailored to users' tastes, analyzing their:
- Liked songs
- Listening history
- Preferred genres/moods

This enhances music discovery and personalization, without manual playlist curation.

---

## 🖥️ Tech Stack

| Layer              | Tech Used                            |
|-------------------|--------------------------------------|
| **Frontend**       | React.js, Tailwind CSS, axios       |
| **State Management** | Context API        |
| **Backend**        | Node.js, Express.js                 |
| **Database**       | MongoDB                             |
| **Authentication** | JWT, Bcrypt                         |
| **Audio**          | HTML5 Audio API        |
| **Cloud Storage**  | Cloudinary     |
| **Deployment**     | Vercel , Render           |

---


## 👥 Actors and Roles

### 👤 User
- Secure login/signup using JWT
- Explore, stream, like, and share music
- Create and manage playlists
- Use smart playlist generation
- Access music from all devices

### 🔐 Admin
- Upload and manage global music catalog
- Add metadata (title, artist, mood, genre, release date)
- Monitor uploads and manage genre categories
- Ensure quality and consistency of music data

---

## 🔒 Cloud Storage & Playback Logic

- Audio & image files stored on **Cloudinary**
- URLs saved in MongoDB
- Frontend streams music directly using `<audio>` tag


---


