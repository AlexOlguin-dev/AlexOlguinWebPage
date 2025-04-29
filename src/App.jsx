import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Views/Game';
import Lobby from './Views/Lobby';
import Ocean from './Views/Ocean';
import Sunset from './Views/Sunset';
import MobileVersion from './Views/MobileVersion';
import { MusicProvider } from './Views/MusicContext.js';
import { SFXProvider } from './Views/SFXContext.js';
import './App.css';

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function App() {
  useEffect(() => {
    document.title = 'Alex Olguin';
    document.body.style.overflow = 'hidden';
  }, []);

  const isMobile = isMobileDevice();

  return (
    <MusicProvider>
      <SFXProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isMobile ? <MobileVersion /> : <Game />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/ocean" element={<Ocean />} />
            <Route path="/sunset" element={<Sunset />} />
          </Routes>
        </BrowserRouter>
      </SFXProvider>
    </MusicProvider>
  );
}

export default App;