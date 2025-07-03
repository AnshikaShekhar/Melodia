import { useState, useEffect } from 'react';
import axios from 'axios';

function Player({ songId }) {
  const [audioUrl, setAudioUrl] = useState('');
  const baseURL = 'http://localhost:4000/';

  useEffect(() => {
    const fetchAudio = async () => {
      const response = await axios.post(`${baseURL}api/songs/${songId}/play`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAudioUrl(response.data.audioUrl);
    };
    if (songId) fetchAudio();
  }, [songId]);

  return audioUrl ? (
    <audio controls autoPlay>
      <source src={audioUrl} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  ) : <p>Loading audio...</p>;
}

export default Player;