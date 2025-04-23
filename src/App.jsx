import React, { useEffect } from 'react';
import './App.css';
import Game from './Views/Game';

function App() {

  useEffect(() => {
    document.title = 'Alex Olguin';
    document.body.style.overflow = "hidden";
  },[])

  return (
    <Game />
  );
}

export default App;