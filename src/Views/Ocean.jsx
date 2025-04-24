// src/pages/Lobby.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/animated_functions.css';
import { useStyles } from './style';
import TopBar from './TopBar';
import GostyImg from '../assets/img/MainCharacter/Gosty.png';
import FloorImg from '../assets/img/Map/floor.png';
import cielo from '../assets/img/Map/ocean.gif';
import PlatformImg from '../assets/img/Map/platform_2.png';
import PuertaImg from '../assets/img/Map/puerta.png';

const Ocean = () => {
  const classes   = useStyles();
  const navigate  = useNavigate();
  const [pos, setPos] = useState({ x: 100, y: 0 });
  const [isNearDoor, setNearDoor] = useState(false);

  const GRAVITY       = -0.03;
  const JUMP_VELOCITY = 2;
  const FLOOR_Y       = 0;
  const MOVE_SPEED    = 5;

  const PLATFORMS = [
    // Aquí puedes añadir plataformas si las necesitas
  ];

  const DOOR_BOX = { 
    x: 50,        // posición horizontal de la puerta
    y: 0,        // posición vertical de la puerta
    width: 100,    // ancho de la puerta
    height: 100,   // alto de la puerta
  };

  const velYRef     = useRef(0);
  const pressedKeys = useRef(new Set());

  useEffect(() => {
    const down = (e) => {
      pressedKeys.current.add(e.key);
      if (e.key === ' ') {
        velYRef.current = JUMP_VELOCITY;
      }
      if (e.key === 'Enter' && isNearDoor) {
        navigate('/lobby');
      }
    };
    const up = (e) => pressedKeys.current.delete(e.key);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [isNearDoor, navigate]);

  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => {
        let newX = p.x;
        let newY = p.y + velYRef.current;

        if (pressedKeys.current.has('ArrowRight')) newX += MOVE_SPEED;
        if (pressedKeys.current.has('ArrowLeft'))  newX -= MOVE_SPEED;

        velYRef.current += GRAVITY;

        const charW = 50;
        const charH = 70;

        const charLeft   = newX;
        const charRight  = newX + charW;
        const charBottom = newY;
        const charTop    = newY + charH;

        // Comprobar proximidad con la puerta
        const doorLeft   = DOOR_BOX.x;
        const doorRight  = DOOR_BOX.x + DOOR_BOX.width;
        const doorBottom = DOOR_BOX.y;
        const doorTop    = DOOR_BOX.y + DOOR_BOX.height;

        const collideDoor =
          charRight > doorLeft &&
          charLeft  < doorRight &&
          charTop   > doorBottom &&
          charBottom < doorTop;

        setNearDoor(collideDoor);

        if (newY <= FLOOR_Y) {
          newY = FLOOR_Y;
          velYRef.current = 0;
        }

        const screenW = window.innerWidth;
        if (newX < 0) newX = 0;
        else if (newX + charW > screenW) newX = screenW - charW;

        return { x: newX, y: newY };
      });
    }, 16);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={classes.main_div}>

      {/* ============================== NAVBAR =================================== */}
      <TopBar />
      {/* ============================== NAVBAR =================================== */}

      <div style={{ position: 'relative', width: '100%', height: 800, backgroundImage: `url(${cielo})`, backgroundSize: 'cover', overflow: 'hidden' }}>

        <img src={FloorImg} alt="Floor" className={classes.suelo} />
        
        <img src={GostyImg} alt="Gosty" style={{ position: 'absolute', left: pos.x, bottom: pos.y + 210, zIndex: 9 }} className={`${classes.gosty} floating`} />

        {/* Puerta añadida */}
        <img src={PuertaImg} alt="Puerta" style={{ position: 'absolute', top: 465, left: 50, width: "150px"  }}/>

        {/* Mensaje de interacción si está cerca de la puerta */}
        {isNearDoor && (
          <div className={classes.t_tip2} style={{ position: 'absolute', top: DOOR_BOX.y - 20, left: DOOR_BOX.x }}>
            Presiona 'Enter' para entrar
          </div>
        )}
      </div>
    </div>
  );
};

export default Ocean;