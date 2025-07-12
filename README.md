# 🎵 Melodia: Cloud Music & Smart Playlist Companion

Melodia is a full-featured **cloud-based music streaming platform** that empowers users to explore, stream, and manage music effortlessly. Inspired by platforms like **Spotify**, **SoundCloud**, and **Wynk**, Melodia integrates modern UI/UX, secure authentication, real-time music playback, and AI-powered smart playlists to enhance user experience.

🔗 **Live Demo:** [https://melodia-brown.vercel.app/](https://melodia-brown.vercel.app/)

---

## 🌐 Live Demo

Access the deployed application here:  
👉 [https://melodia-brown.vercel.app/](https://melodia-brown.vercel.app/)

---

## 📌 Features

### 👤 User Functionality
- 🔐 Secure JWT Authentication (Login/Signup)
- ✉️ OTP Verification via EmailJS during Signup
- 🔥 Browse Trending Songs & Genres
- 🎵 Create and Manage Personal Playlists
- ❤️ Like and Share Songs/Playlists
- 🧠 Smart AI Playlist Generation
- 🔍 Search & Filter Songs (by Genre, Artist, Duration)
- 🎧 Persistent Bottom Music Player
- 📱 Responsive, Modern User Interface

### 🛠 Admin Functionality
- 👮‍♂️ Role-Based Access Control
- 🧾 Admin Access Request System
  - Users can **request admin access** from the dashboard.
  - Admin access is granted only upon developer verification.
  - Developers can **login using a secret key** to approve admin access.
- 📤 Upload Songs with Metadata (title, artist, genre, mood, duration, release date)
- ☁️ Cloud Upload via Cloudinary (audio/image)
- 🕒 Automatic Audio Duration Calculation
- 📊 Visual Upload Progress

---

## 🧠 AI-Generated Smart Playlist

Melodia uses an AI-based recommendation engine that generates playlists tailored to user preferences by analyzing:
- ❤️ Liked Songs
- 📈 Listening History
- 🎭 Preferred Genres and Moods

This ensures personalized and engaging music discovery experiences.

---

## 🖥️ Tech Stack

| Layer               | Tech Used                            |
|--------------------|--------------------------------------|
| **Frontend**        | React.js, Tailwind CSS, Axios        |
| **State Management**| Context API                          |
| **Backend**         | Node.js, Express.js                  |
| **Database**        | MongoDB                              |
| **Authentication**  | JWT, Bcrypt                          |
| **Email Service**   | EmailJS (OTP verification)           |
| **Audio**           | HTML5 Audio API                      |
| **Cloud Storage**   | Cloudinary                           |
| **Deployment**      | Vercel (Frontend), Render (Backend)  |

---

## 👥 Actors & Roles

### 👤 User
- Secure login/signup using JWT
- OTP verification via EmailJS
- Explore & play songs
- Like, share, and create playlists
- Access smart playlists
- Cross-device support

### 🔐 Admin
- Users can request admin access
- Developer grants access by verifying secret key
- Upload/manage songs and metadata
- Categorize songs
- Ensure quality control
- Manage global music catalog

---

## 🔒 Cloud Storage & Playback Logic

- 🎼 Audio & images are uploaded to **Cloudinary**
- 🗃️ URLs stored in **MongoDB**
- 🎧 Playback via HTML5 `<audio>` streaming directly from the cloud

---

