import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/animated_functions.css';
import { useStyles } from './style';
import TopBar from './TopBar';
import GostyImg from '../assets/img/MainCharacter/Gosty.png';
import FloorImg from '../assets/img/Map/floor.png';
import cielo from '../assets/img/Map/sunset.gif';
import PlatformImg from '../assets/img/Map/platform_2.png';
import Sign1 from '../assets/img/Map/sign_1.png';
import Sign2 from '../assets/img/Map/sign_2.png';
import Sign3 from '../assets/img/Map/sign_3.png';
import final_sign from '../assets/img/Map/final_sign.png';
import Titulo from '../assets/img/Titulo_final.png';
import { FaWhatsapp } from "react-icons/fa";
import { SFXContext } from './SFXContext';

const Sunset = () => {
  const classes   = useStyles();
  const navigate  = useNavigate();
  const [pos, setPos] = useState({ x: 100, y: 0  });
  const [isJumping, setJump] = useState(false);
  const [onHoverSign1, setOnHoverSign1] = useState(false);
  const [onHoverSign2, setOnHoverSign2] = useState(false);
  const [onHoverSign3, setOnHoverSign3] = useState(false);

  const { playJumpSound } = useContext(SFXContext);

  /*  ======== constantes físicas ========  */
  const GRAVITY       = -1;
  const JUMP_VELOCITY = 21;
  const FLOOR_Y       = 0;
  const MOVE_SPEED    = 5;

  const PLATFORMS = [
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
        // Reproducir sonido de salto
        playJumpSound();
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
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
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

      <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundImage: `url(${cielo})`, backgroundSize: 'cover', overflow: 'hidden' }}>

        {/* Suelo */}
        <img src={FloorImg} alt="Floor" className={classes.suelo} />

        {/** Logo con data */}
        <img src={Titulo} alt="titulo" style={{ position: 'absolute', top: 30, left: "38%", width: '400px' }} />
        <div style={{ position: 'absolute', top: 150, left: "40.2%", width: '260px', color: "#DDEAC2"}}>
          <span style={{ fontSize: 25, fontFamily: "'VT323', monospace" }}>
            E-Mail:
          </span>
          <br/>
          <span style={{ fontSize: 30, fontFamily: "'VT323', monospace", fontWeight: "bold" }}>
            alex.olguin.erpel@gmail.com
          </span>
          <br/>
          <span style={{ fontSize: 25, fontFamily: "'VT323', monospace" }}>
            Whatsapp:
          </span>
          <br/>
          <a href="https://wa.me/56989090514" target="_blank" rel="noopener noreferrer" style={{ color: "#DDEAC2", textDecoration: 'none' }} >
            <span style={{ display: "flex", alignItems: "center", fontSize: 30, fontFamily: "'VT323', monospace", fontWeight: "bold", gap: 8 }}>
              +56989090514 <FaWhatsapp />
            </span>
          </a>
        </div>

        {/**Carteles de navegacion */}
        <img src={Sign1} alt="Inicio1" onMouseEnter={() => setOnHoverSign1(true)} onMouseLeave={() => setOnHoverSign1(false)} onClick={() => navigate('/')} style={{ position: 'absolute', bottom: 195, left: "25%", width: "10%" }} />
        <img src={Sign2} alt="Inicio2" onMouseEnter={() => setOnHoverSign2(true)} onMouseLeave={() => setOnHoverSign2(false)} onClick={() => navigate('/lobby')} style={{ position: 'absolute', bottom: 195, left: "45%", width: "10%" }} />
        <img src={Sign3} alt="Inicio3" onMouseEnter={() => setOnHoverSign3(true)} onMouseLeave={() => setOnHoverSign3(false)} onClick={() => navigate('/ocean')} style={{ position: 'absolute', bottom: 195, left: "65%", width: "10%" }} />

        { onHoverSign1 ? (
          <div style={{ position: 'absolute', bottom: 430, left: "26.5%", width: "100px", height: "60px", backgroundColor: "#E8AA6B", color: "#fff", border: '4px solid #000', padding: "10px", textAlign: "center" }}>
            <span style={{ fontSize: 30, fontFamily: "'VT323', monospace" }}>
              Viaja al inicio
            </span>
          </div>
        ) : null}

        { onHoverSign2 ? (
          <div style={{ position: 'absolute', bottom: 430, left: "44%", width: "200px", height: "100px", backgroundColor: "#E8AA6B", color: "#fff", border: '4px solid #000', padding: "10px", textAlign: "center" }}>
            <span style={{ fontSize: 30, fontFamily: "'VT323', monospace" }}>
              Viaja a Lenguajes de programación
            </span>
          </div>
        ) : null}

        { onHoverSign3 ? (
          <div style={{ position: 'absolute', bottom: 430, left: "64%", width: "200px", height: "60px", backgroundColor: "#E8AA6B", color: "#fff", border: '4px solid #000', padding: "10px", textAlign: "center" }}>
            <span style={{ fontSize: 30, fontFamily: "'VT323', monospace" }}>
              Viaja a Portafolio
            </span>
          </div>
        ) : null}

        {/**Cartel de instrucciones */}
        <img src={final_sign} alt="final_sign" style={{ position: 'absolute', bottom: 200, left: 50, width: "380px" }} />
        <div style={{ position: 'absolute', bottom: 520, left: 120, width: '260px' }}>
          <span style={{ fontSize: 30, fontFamily: "'VT323', monospace" }}>
            Selecciona un mapa al que quieras regresar.
          </span>
        </div>

        {/* Personaje */}
        <img src={GostyImg} alt="Gosty" style={{ position: 'absolute', left: pos.x, bottom: pos.y + 210, zIndex: 9 }} className={`${classes.gosty} floating`}/>
      </div>
    </div>
  );
};

export default Sunset;