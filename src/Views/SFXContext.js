// SFXContext.js
import React, { createContext, useRef } from 'react';

export const SFXContext = createContext();

export const SFXProvider = ({ children }) => {
  const jumpSoundRef = useRef(new Audio('../assets/sounds/jump.mp3')); // archivo en /public

  const playJumpSound = () => {
    if (jumpSoundRef.current) {
      jumpSoundRef.current.currentTime = 0;
      jumpSoundRef.current.play().catch((err) => {
        console.warn('No se pudo reproducir el sonido de salto:', err);
      });
    }
  };

  return (
    <SFXContext.Provider value={{ playJumpSound }}>
      {children}
    </SFXContext.Provider>
  );
};
