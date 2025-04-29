// MusicContext.js
import React, { createContext, useRef, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio('../assets/sounds/main_music.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = () => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => {
        console.warn('Autoplay bloqueado:', err);
      });
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ playMusic, pauseMusic, isPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};