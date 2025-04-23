// src/pages/Lobby.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/animated_functions.css';
import { useStyles } from './style';
import TopBar from './TopBar';
import GostyImg from '../assets/img/MainCharacter/Gosty.png';
import FloorImg from '../assets/img/Map/floor.png';
import cielo from '../assets/img/Map/lobby.png';
import Torch from '../assets/img/Map/torch.gif';
import PlatformImg from '../assets/img/Map/platform_2.png';

const Lobby = () => {
  const classes   = useStyles();
  const navigate  = useNavigate();
  const [pos, setPos] = useState({ x: 100, y: 320  });
  const [isJumping, setJump] = useState(false);

  /*  ======== constantes físicas ========  */
  const GRAVITY       = -1;
  const JUMP_VELOCITY = 30;
  const FLOOR_Y       = 0;
  const MOVE_SPEED    = 5;

  const PLATFORMS = [
    { x: 100, y: 300, width: 400, height: 20 },
    { x: 500, y: 100, width: 100, height: 20 },
    { x: 750, y: 150, width: 150, height: 20 },
    { x: 950, y: 350, width: 250, height: 20 },
  ];

  /* ===== refs para no re‑renderizar en cada frame ===== */
  const velYRef     = useRef(0);
  const pressedKeys = useRef(new Set());

  /*  ===== listeners teclado =====  */
  useEffect(() => {
    const down = (e) => {
      pressedKeys.current.add(e.key);
      if (e.key === ' ' && !isJumping) {
        velYRef.current = JUMP_VELOCITY;
        setJump(true);
      }
    };
    const up = (e) => pressedKeys.current.delete(e.key);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup',   up);
    };
  }, [isJumping]);

  /*  ===== bucle de juego (16 ms ≈ 60 fps) ===== */
  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => {
        let newX = p.x;
        let newY = p.y + velYRef.current;

        // movimiento horizontal
        if (pressedKeys.current.has('ArrowRight')) newX += MOVE_SPEED;
        if (pressedKeys.current.has('ArrowLeft'))  newX -= MOVE_SPEED;

        // aplicar gravedad
        velYRef.current += GRAVITY;

        /* ===========================================================
           MANEJO DE COLISIÓN CON LA PLATAFORMA (copiado del Game.jsx)
        ============================================================*/
        const charW = 50;
        const charH = 70;

        const charLeft   = newX;
        const charRight  = newX + charW;
        const charBottom = newY;
        const charTop    = newY + charH;

        const isFalling = velYRef.current < 0;

        for (const plat of PLATFORMS) {
          const platformTop    = plat.y + plat.height;
          const platformBottom = plat.y;
          const platformLeft   = plat.x;
          const platformRight  = plat.x + plat.width;

          const isAbovePlatform    = p.y >= platformTop;
          const isWithinPlatformX  = charRight > platformLeft && charLeft < platformRight;
          const willLandOnPlatform = charBottom <= platformTop && charBottom >= platformBottom;

          if (isFalling && isAbovePlatform && willLandOnPlatform && isWithinPlatformX) {
            newY = platformTop;
            velYRef.current = 0;
            setJump(false);
            break;                 // ya colisionó con una, no hace falta revisar más
          }
        }

        /*  ===== colisión con el suelo ===== */
        if (newY <= FLOOR_Y) {
          newY = FLOOR_Y;
          velYRef.current = 0;
          setJump(false);
        }

        /*  ===== mantener dentro del viewport ===== */
        const screenW = window.innerWidth;
        if (newX < 0) newX = 0;
        else if (newX + charW > screenW) newX = screenW - charW;

        return { x: newX, y: newY };
      });
    }, 16);
    return () => clearInterval(id);
  }, []);

  /*  ===== render ===== */
  return (
    <div className={classes.main_div}>
      <TopBar />

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 800,
          backgroundImage: `url(${cielo})`,
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        {/** TORCHES SEQUENCE */}
        <img src={Torch} alt="torch1" style={{ position: 'absolute', width: "170px", top: 375, left: 96 }} />
        <img src={Torch} alt="torch2" style={{ position: 'absolute', width: "170px", top: 375, left: 336 }} />
        <img src={Torch} alt="torch3" style={{ position: 'absolute', width: "170px", top: 375, left: 570 }} />
        <img src={Torch} alt="torch4" style={{ position: 'absolute', width: "170px", top: 375, left: 808 }} />
        <img src={Torch} alt="torch5" style={{ position: 'absolute', width: "170px", top: 375, left: 1048 }} />
        <img src={Torch} alt="torch6" style={{ position: 'absolute', width: "170px", top: 375, left: 1284 }} />

        {/* Suelo */}
        <img src={FloorImg} alt="Floor" className={classes.suelo} />

        {/* Plataforma */}
        <div
          className={classes.plataforma}
          style={{
            position: 'absolute',
            left: PLATFORMS[0].x,
            top: 280,
            width: PLATFORMS[0].width,
            height: 80,
            backgroundImage: `url(${PlatformImg})`,
            backgroundSize: 'cover',
          }}
        />

        {/**Plataforma 2 */}
        <div
          className={classes.plataforma}
          style={{
            position: 'absolute',
            left: PLATFORMS[1].x, // un poco más a la derecha
            top: 480,               // un poco más abajo
            width: PLATFORMS[1].width,
            height: 80,
            backgroundImage: `url(${PlatformImg})`,
            backgroundSize: 'cover',
          }}
        />

        {/**Plataforma 3 */}
        <div
          className={classes.plataforma}
          style={{
            position: 'absolute',
            left: PLATFORMS[2].x, // un poco más a la derecha
            top: 430,               // un poco más abajo
            width: PLATFORMS[2].width,
            height: 80,
            backgroundImage: `url(${PlatformImg})`,
            backgroundSize: 'cover',
          }}
        />

        {/**Plataforma 4 */}
        <div
          className={classes.plataforma}
          style={{
            position: 'absolute',
            left: PLATFORMS[3].x, // un poco más a la derecha
            top: 230,               // un poco más abajo
            width: PLATFORMS[3].width,
            height: 80,
            backgroundImage: `url(${PlatformImg})`,
            backgroundSize: 'cover',
          }}
        />

        {/* Personaje */}
        <img src={GostyImg} alt="Gosty" style={{ position: 'absolute', left: pos.x, bottom: pos.y + 210, zIndex: 9 }} className={`${classes.gosty} floating`}/>
      </div>
    </div>
  );
};

export default Lobby;