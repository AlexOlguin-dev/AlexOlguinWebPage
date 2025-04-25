import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/animated_functions.css';
import { useStyles } from "./style";
import TopBar from './TopBar';
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

const LEVER_TEXT = `
¡Hola! Bienvenidos... Soy Alex Olguín, un desarrollador web con sólida trayectoria, 
capaz de crear desde sitios livianos hasta plataformas complejas, cubriendo todo el ciclo de vida: 
análisis, arquitectura, desarrollo full‑stack y despliegue. Este breve portafolio es una muestra de 
mi habilidad para transformar ideas en soluciones digitales de calidad. Me adapto rápido, aprendo 
nuevas tecnologías con entusiasmo y colaboro eficazmente para impulsar los objetivos del negocio.
`;

const Game = () => {

  const classes = useStyles();
  const navigate = useNavigate(); 
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activatedLever, setActivatedLever] = useState(false);
  const [showMansionTip, setShowMansionTip] = useState(false);

  const velocityYRef = useRef(0);
  const pressedKeys = useRef(new Set());
  const typedText = useTypewriter(activatedLever ? LEVER_TEXT : '', 15); // 15 ms ≈ 65 cps

  const GRAVITY = -1;
  const JUMP_VELOCITY = 20;
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

  const MANSION_BOX = {
    x: 1100, // ajusta según la posición real de tu imagen
    y: 0, // altura desde el suelo hasta la base de la mansión
    width: 100, // ancho aproximado de la mansión
    height: 300, // alto aproximado
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      pressedKeys.current.add(e.key);
      if (e.key === ' ' && !isJumping) {
        velocityYRef.current = JUMP_VELOCITY;
        setIsJumping(true);
      }
      // Activar palanca
      if (e.key === 'Enter' && !activatedLever && showTooltip) {
        setActivatedLever(true);
      }
      // Entrar a la mansión
      if (e.key === 'Enter' && showMansionTip) {
        navigate('/lobby');        // <-- redirige
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
  }, [isJumping, activatedLever, showTooltip, showMansionTip]);

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

        if (
          charRight > MANSION_BOX.x &&
          charLeft < MANSION_BOX.x + MANSION_BOX.width &&
          charBottom <= MANSION_BOX.y + MANSION_BOX.height &&
          charTop >= MANSION_BOX.y
        ) {
          setShowMansionTip(true);
        } else {
          setShowMansionTip(false);
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
      <TopBar />
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

        {showMansionTip && (
          <div className={classes.t_tip} style={{ position: 'absolute', left: 900, bottom: MANSION_BOX.y + MANSION_BOX.height + 20, }}>
            <img src={EnterLogo} alt="Enter" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
            <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
              Presiona 'Enter' para entrar a la mansión
            </span>
          </div>
        )}

        {/* Personaje */}
        <img src={GostyImg} alt="Gosty" style={{ position: 'absolute', left: position.x, bottom: position.y + 210, zIndex: 9 }} className={`${classes.gosty} floating`} />
        
      </div>
    </div>
  );
};

export default Game;