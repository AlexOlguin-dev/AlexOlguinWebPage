import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Views/Game';
import Lobby from './Views/Lobby';
import './App.css';

function App() {

  useEffect(() => {
    document.title = 'Alex Olguin';
    document.body.style.overflow = "hidden";
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;