// src/pages/Lobby.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/animated_functions.css';
import { useStyles } from './style';
import TopBar from './TopBar';
import GostyImg from '../assets/img/MainCharacter/Gosty_swim.png';
import FloorImg from '../assets/img/Map/floor2.png';
import cielo from '../assets/img/Map/ocean.gif';
import PlatformImg from '../assets/img/Map/platform_2.png';
import PuertaImg from '../assets/img/Map/puerta.png';
import EnterLogo from '../assets/img/Instructions/Enter.png';
import FishImg1 from '../assets/img/Map/fish_1.gif'; // Sprite del pez hacia la derecha
import FishImg2 from '../assets/img/Map/fish_2.gif'; // Sprite del pez hacia la izquierda

const Ocean = () => {
  const classes   = useStyles();
  const navigate  = useNavigate();
  const [pos, setPos] = useState({ x: 100, y: 0 });
  const [isNearDoor, setNearDoor] = useState(false);
  const [isNearDoor2, setNearDoor2] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar el hover

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

  const DOOR_2 = {
    x: 1400,
    y: 0,
    width: 100,
    height: 100,
  };

  const velYRef     = useRef(0);
  const pressedKeys = useRef(new Set());

  const fishRef = useRef({ x: 0, direction: 1 }); // Estado del pez (posición y dirección)

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  },[])

  useEffect(() => {
    const down = (e) => {
      pressedKeys.current.add(e.key);
      if (e.key === ' ') {
        velYRef.current = JUMP_VELOCITY;
      }
      if (e.key === 'Enter' && isNearDoor) {
        navigate('/lobby');
      }
      if (e.key === 'Enter' && isNearDoor2) {
        navigate('/');
      }
    };
    const up = (e) => pressedKeys.current.delete(e.key);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [isNearDoor, isNearDoor2]);

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

        // Comprobar proximidad con la puerta 2
        const door2Left   = DOOR_2.x;
        const door2Right  = DOOR_2.x + DOOR_2.width;
        const door2Bottom = DOOR_2.y;
        const door2Top    = DOOR_2.y + DOOR_2.height;

        const collideDoor2 =
          charRight > door2Left &&
          charLeft  < door2Right &&
          charTop   > door2Bottom &&
          charBottom < door2Top;
        
        setNearDoor2(collideDoor2);

        if (newY <= FLOOR_Y) {
          newY = FLOOR_Y;
          velYRef.current = 0;
        }

        const screenW = window.innerWidth;
        if (newX < 0) newX = 0;
        else if (newX + charW > screenW) newX = screenW - charW;

        // Mover al pez en un ciclo infinito solo si no está en hover
        if (!isHovered) {
          fishRef.current.x += fishRef.current.direction * 2; // Cambia de dirección con cada ciclo
          if (fishRef.current.x >= screenW - 100 || fishRef.current.x <= 0) {
            fishRef.current.direction *= -1; // Cambia la dirección
          }
        }

        return { x: newX, y: newY };
      });
    }, 16);
    return () => clearInterval(id);
  }, [isHovered]);

  // Determina qué sprite usar para el pez dependiendo de su dirección
  const fishSprite = fishRef.current.direction === 1 ? FishImg1 : FishImg2;

  return (
    <div className={classes.main_div}>

      {/* ============================== NAVBAR =================================== */}
      <TopBar />
      {/* ============================== NAVBAR =================================== */}

      <div style={{ position: 'relative', width: '100%', height: 800, backgroundImage: `url(${cielo})`, backgroundSize: 'cover', overflow: 'hidden' }}>

        <img src={FloorImg} alt="Floor" className={classes.suelo} />
        
        <img src={GostyImg} alt="Gosty" style={{ position: 'absolute', left: pos.x, bottom: pos.y + 210, zIndex: 9 }} className={`${classes.gosty_swim} floating`} />

        {/* Puerta añadida */}
        <img src={PuertaImg} alt="Puerta" style={{ position: 'absolute', top: 510, left: 50, width: "100px"  }} />
        <img src={PuertaImg} alt="puerta_1" style={{ position: 'absolute', top: 510, left: 1400, width: "100px" }} />

        {/* Pez animado que se mueve de un extremo a otro, con hover */}
        <div
          style={{
            position: 'absolute',
            top: 300,
            left: fishRef.current.x,
            width: '100px',
            height: '100px',
            zIndex: 10,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <>
              <img
                src={require('../assets/img/Map/dialogo.png')}
                alt="Dialogo"
                style={{
                  position: 'absolute',
                  top: -240, // Ajusta según lo alto que quieras el diálogo
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 300,
                }}
              />
            </>
          )}
          <img
            src={fishSprite}
            alt="Pez"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Mensaje de interacción si está cerca de la puerta */}
        {isNearDoor && (
          <div className={classes.t_tip2} style={{ position: 'absolute', top: 330, left: DOOR_BOX.x }}>
            <img src={EnterLogo} alt="Enter" style={{ width: 80, height: 80, marginBottom: 5 }} />
            <span style={{ fontSize: 20, fontFamily: "'VT323', monospace" }}>
              Presiona 'Enter' para volver a la habitacion anterior.
            </span>
          </div>
        )}

        {/* Mensaje de interacción para la puerta 2 */}
        {isNearDoor2 && (
          <div
            className={classes.t_tip2}
            style={{
              position: 'absolute',
              left: 1300, // centrado ±
              top:  280,      // 90 ≈ alto tooltip
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={EnterLogo} alt="Enter" style={{ width: 80, height: 80, marginBottom: 5 }} />
            <span style={{ fontSize: 20, fontFamily: "'VT323', monospace" }}>
              Presiona 'Enter' para ir a la siguiente habitación
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default Ocean;