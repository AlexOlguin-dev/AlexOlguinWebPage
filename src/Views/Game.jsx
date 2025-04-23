import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import '../assets/css/animated_functions.css';
import { useStyles } from "./style";
import TranslateIcon from '@mui/icons-material/Translate';
import GostyImg from '../assets/img/MainCharacter/Gosty.png';
import FloorImg from '../assets/img/Map/floor.png';
import Plarform1 from '../assets/img/Map/platform_1.png';
import cielo from '../assets/img/Map/Sky.gif';
import Mansion from '../assets/img/Map/HauntedMansion.png';
import EnterLogo from '../assets/img/Instructions/Enter.png';
import Palanca from '../assets/img/Map/Palanca.png';
import Palanca2 from '../assets/img/Map/Palanca2.png';
import Navegacion from '../assets/img/Map/Navegacion.png';
import Titulo from '../assets/img/Titulo.png';
import QuestionBox from '../assets/img/Map/InfoBox.png';
import IconoPersonalizado from '../assets/img/Icon.png';

const LEVER_TEXT = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
qui officia deserunt mollit anim id est laborum.
`;


const Game = () => {

  const classes = useStyles();
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activatedLever, setActivatedLever] = useState(false);

  const velocityYRef = useRef(0);
  const pressedKeys = useRef(new Set());
  const typedText = useTypewriter(activatedLever ? LEVER_TEXT : '', 15); // 15 ms ≈ 65 cps

  const GRAVITY = -1;
  const JUMP_VELOCITY = 30;
  const FLOOR_Y = 0;
  const MOVE_SPEED = 5;

  // Definimos la plataforma
  const PLATFORM = {
    x: 300,
    y: 200,  // Suelo de la plataforma (parte superior)
    width: 200,
    height: 20,  // Altura de la plataforma
  };

  // Definimos la caja de la palanca
  const LEVER_BOX = {
    x: 500,
    y: FLOOR_Y + 50,  // Un poco arriba del suelo
    width: 60,
    height: 60,
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      pressedKeys.current.add(e.key);
      if (e.key === ' ' && !isJumping) {
        velocityYRef.current = JUMP_VELOCITY;
        setIsJumping(true);
      }
      if (e.key === 'Enter' && !activatedLever && showTooltip) {
        setActivatedLever(true);
      }
    };

    const handleKeyUp = (e) => {
      pressedKeys.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, activatedLever, showTooltip]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((pos) => {
        let newX = pos.x;
        let newY = pos.y + velocityYRef.current;
  
        if (pressedKeys.current.has('ArrowRight')) newX += MOVE_SPEED;
        if (pressedKeys.current.has('ArrowLeft')) newX -= MOVE_SPEED;
  
        velocityYRef.current += GRAVITY;
  
        const characterWidth = 50;
        const characterHeight = 70;
  
        const charLeft = newX;
        const charRight = newX + characterWidth;
        const charBottom = newY;
        const charTop = newY + characterHeight;
  
        const platformTop = PLATFORM.y + PLATFORM.height; // Parte superior de la plataforma
        const platformBottom = PLATFORM.y; // Parte inferior de la plataforma
        const platformLeft = PLATFORM.x;
        const platformRight = PLATFORM.x + PLATFORM.width;
  
        // Verificamos si el personaje está cayendo sobre la plataforma
        const isFalling = velocityYRef.current < 0;
        const isAbovePlatform = pos.y >= platformTop; // Si está encima de la plataforma
        const isWithinPlatformX = charRight > platformLeft && charLeft < platformRight;
  
        // Verificamos si el personaje llega a la plataforma
        const willLandOnPlatform = charBottom <= platformTop && charBottom >= platformBottom;
  
        // Si el personaje está cayendo y se encuentra en el rango de la plataforma
        if (isFalling && isAbovePlatform && willLandOnPlatform && isWithinPlatformX) {
          newY = platformTop;  // Lo dejamos en la parte superior de la plataforma
          velocityYRef.current = 0;  // Detenemos la caída
          setIsJumping(false);
        }
  
        // Si no está en la plataforma, sigue cayendo hasta el suelo
        if (newY <= FLOOR_Y) {
          newY = FLOOR_Y;
          velocityYRef.current = 0;
          setIsJumping(false);
        }
  
        // Limitar la posición X para que no se salga de los márgenes
        const screenWidth = window.innerWidth;
        if (newX < 0) {
          newX = 0;  // Si está fuera de la pantalla por la izquierda
        } else if (newX + characterWidth > screenWidth) {
          newX = screenWidth - characterWidth;  // Si está fuera de la pantalla por la derecha
        }

        // Verificamos si Gosty está sobre la caja de la palanca
        if (
          charRight > LEVER_BOX.x &&
          charLeft < LEVER_BOX.x + LEVER_BOX.width &&
          charBottom <= LEVER_BOX.y + LEVER_BOX.height &&
          charTop >= LEVER_BOX.y
        ) {
          setShowTooltip(true);
        } else {
          setShowTooltip(false);
        }
  
        return { x: newX, y: newY };
      });
    }, 16);
  
    return () => clearInterval(interval);
  }, [activatedLever]);

  function useTypewriter(fullText, speed = 20) {      // speed = ms por carácter
    const [display, setDisplay] = useState('');
  
    useEffect(() => {
      let i = 0;
      if (!fullText) { setDisplay(''); return; }
  
      const id = setInterval(() => {
        i++;
        setDisplay(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(id);
      }, speed);
  
      return () => clearInterval(id);
    }, [fullText, speed]);
  
    return display;
  }

  return (
    <div className={classes.main_div}>

      {/* ============================== NAVBAR =================================== */}
      <div className={classes.navbar}>
        <img src={IconoPersonalizado} alt="Icono" style={{ width: '40px', height: '40px', objectFit: 'contain' }}/>
        <div style={{ width: "100px" }}>
          <IconButton edge="start" color="inherit" aria-label="translate">
            <TranslateIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
      </div>
      {/* ============================== NAVBAR =================================== */}

      <div style={{ position: 'relative', width: '100%', height: '800px', backgroundImage: `url(${cielo})`, backgroundSize: 'cover', overflow: 'hidden', zIndex: 1 }}>

        {/** Titulo */}
        <img src={Titulo} alt="Titulo" className={classes.titulo} />
        <span className={classes.desarrollador}>Desarrollador</span>
        <span className={classes.web}>Web</span>
        
        {/**Haunted Mansion */}
        <img src={Mansion} alt="mansion" className={classes.mansion} />

        {/**Letrero */}
        <img src={Navegacion} alt="Navegacion" className={classes.letrero} />

        {/* Suelo del juego */}
        <img src={FloorImg} alt="Floor" className={classes.suelo}/>

        {/* Plataforma */}
        <div className={classes.plataforma} style={{ backgroundImage: `url(${Plarform1})` }}></div>

        {/* Caja de la palanca */}
        <div className={classes.palanca} style={{ position: 'absolute', left: LEVER_BOX.x, height: LEVER_BOX.height, backgroundImage: activatedLever ? `url(${Palanca2})` : `url(${Palanca})` }}/>
        
        {/* Tooltip */}
        {showTooltip && !activatedLever && (
          <div className={classes.t_tip} style={{ position: 'absolute', left: LEVER_BOX.x, bottom: 260 }}>
            <img src={EnterLogo} alt="Enter" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
            <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
              Presiona 'Enter' para activar la palanca
            </span>
          </div>
        )}

        {/* Mensaje de acción de la palanca */}
        {activatedLever && (
          <div className={classes.m_palanca}>
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 40px)', fontSize: 22, whiteSpace: 'pre‑wrap' }}>
              {typedText}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={QuestionBox} alt="Info Icon" style={{ width: 30, height: 30, marginTop: 8 }}/>
            </div>
          </div>
        )}

        {/* Personaje */}
        <img src={GostyImg} alt="Gosty" style={{ position: 'absolute', left: position.x, bottom: position.y + 210 }} className={classes.gosty} />
        
      </div>
    </div>
  );
};

export default Game;