import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Views/Game';
import Lobby from './Views/Lobby';
import Ocean from './Views/Ocean';
import MobileVersion from './Views/MobileVersion';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isMobile ? <MobileVersion /> : <Game />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/ocean" element={<Ocean />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;