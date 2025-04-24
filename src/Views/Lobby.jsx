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
import PuertaImg from '../assets/img/Map/puerta.png';
import Sign from '../assets/img/Map/hanging_sign.png';
import EnterLogo from '../assets/img/Instructions/Enter.png';
import Pilar from '../assets/img/Map/pilar.png';
import JS from '../assets/img/Lenguajes/JavaScript.png';
import Python from '../assets/img/Lenguajes/python.png';
import PHP from '../assets/img/Lenguajes/php.png';
import MySql from '../assets/img/Lenguajes/mysql.png';
import RJS from '../assets/img/Lenguajes/React.png';
import JQUERY from '../assets/img/Lenguajes/jQuery.png';
import Node from '../assets/img/Lenguajes/node.png';
import MUI from '../assets/img/Lenguajes/MUI.png';
import Bootstrap from '../assets/img/Lenguajes/bootstrap.png';
import Django from '../assets/img/Lenguajes/django.png';
import FastAPI from '../assets/img/Lenguajes/fastapi.png';
import Pandas from '../assets/img/Lenguajes/pandas.png';
import Matplotlib from '../assets/img/Lenguajes/matplotlib.png';
import Lumen from '../assets/img/Lenguajes/lumen.png';
import Laravel from '../assets/img/Lenguajes/laravel.png';
import Nginx from '../assets/img/Lenguajes/ngnex.png';
import Postgre from '../assets/img/Lenguajes/postgres.png';
import Wampp from '../assets/img/Lenguajes/wampp.png';
import Xampp from '../assets/img/Lenguajes/xampp.png';

const Lobby = () => {
  const classes   = useStyles();
  const navigate  = useNavigate();
  const [pos, setPos] = useState({ x: 140, y: 320  });
  const [isJumping, setJump] = useState(false);
  const [isNearDoor, setNearDoor] = useState(false);
  const [isNearDoor2, setNearDoor2] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  /*  ======== constantes físicas ========  */
  const GRAVITY       = -1;
  const JUMP_VELOCITY = 22;
  const FLOOR_Y       = 0;
  const MOVE_SPEED    = 5;

  const PLATFORMS = [
    { x: 100, y: 300, width: 400, height: 20 },
    { x: 500, y: 100, width: 100, height: 20 },
    { x: 750, y: 150, width: 150, height: 20 },
    { x: 950, y: 350, width: 250, height: 20 },
  ];

  const DOOR_BOX = { // posición/medidas de la puerta
    x: 100,        // mismo “left” que <img Puerta>
    y: 123,        // mismo “top”   que <img Puerta>
    width: 150,    // idéntico al width de la imagen
    height: 240,   // alto aproximado de la imagen
  };

  const DOOR_2 = {
    x: 1300,
    y: 0,
    width: 100,
    height: 100,
  };
    
  const TOOLTIP_OFFSET = 20;       // separación vertical sobre la puerta

  // justo encima de DOOR_BOX
  const ICONS = [
    {
      id: 'js',
      x: 350,
      y: 0,
      width: 100,
      height: 100,
      message: 'JS',
      msg_pos_top: 70,
      msg_pos_left: 900,
      s_width: 600,
      s_height: 500,
    },
    {
      id: 'py',
      x: 800,
      y: 200,
      width: 100,
      height: 100,
      message: 'PY',
      msg_pos_top: 220,
      msg_pos_left: 50,
      s_width: 650,
      s_height: 450,
    },
    {
      id: 'php',
      x: 1010,
      y: 400,
      width: 100,
      height: 100,
      message: 'PHP',
      msg_pos_top: 220,
      msg_pos_left: 500,
      s_width: 500,
      s_height: 400,
    },
    {
      id: 'mysql',
      x: 1100,
      y: 0,
      width: 100,
      height: 100,
      message: 'SQL',
      msg_pos_top: 250,
      msg_pos_left: 100,
      s_width: 800,
      s_height: 400,
    },
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
      if (e.key === 'Enter' && isNearDoor) {
        navigate('/');
      }
      if (e.key === 'Enter' && isNearDoor2) {
        navigate('/ocean');
      }
    };
    const up = (e) => pressedKeys.current.delete(e.key);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup',   up);
    };
  }, [isJumping,isNearDoor,isNearDoor2]);

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

        /* ===== detectar proximidad a la puerta ===== */
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

        // === detectar colisión con iconos ===
        let touchedIcon = null;
        for (const icon of ICONS) {
          const iconLeft   = icon.x;
          const iconRight  = icon.x + icon.width;
          const iconBottom = icon.y;
          const iconTop    = icon.y + icon.height;

          const collideIcon =
            charRight > iconLeft &&
            charLeft  < iconRight &&
            charTop   > iconBottom &&
            charBottom < iconTop;

          if (collideIcon) { touchedIcon = icon; break; }
        }
        setActiveIcon(touchedIcon);

        return { x: newX, y: newY };
      });
    }, 16);
    return () => clearInterval(id);
  }, []);

  /*  ===== render ===== */
  return (
    <div className={classes.main_div}>
      
      {/* ============================== NAVBAR =================================== */}
      <TopBar />
      {/* ============================== NAVBAR =================================== */}

      <div style={{ position: 'relative', width: '100%', height: 800, backgroundImage: `url(${cielo})`, backgroundSize: 'cover', overflow: 'hidden' }}>

        {/** TORCHES SEQUENCE */}
        <img src={Torch} alt="torch1" style={{ position: 'absolute', width: "170px", top: 450, left: 50 }} />
        <img src={Torch} alt="torch1" style={{ position: 'absolute', width: "170px", top: 450, left: 600 }} />
        <img src={Torch} alt="torch1" style={{ position: 'absolute', width: "170px", top: 450, left: 950 }} />
        <img src={Torch} alt="torch1" style={{ position: 'absolute', width: "170px", top: 450, left: 1400 }} />

        {/**Puerta */}
        <img src={PuertaImg} alt="puerta_1" style={{ position: 'absolute', top: 143, left: 100, width: "150px" }} />
        <img src={PuertaImg} alt="puerta_1" style={{ position: 'absolute', top: 465, left: 1300, width: "150px" }} />

        {/**Sign */}
        <img src={Sign} alt="sign" style={{ position: 'absolute', top: 50, left: 0, width: "900px" }} />
        <span style={{ position: 'absolute', top: 135, left: 400, color: "#DBEAC5", fontSize: 44, fontFamily: "'VT323', monospace" }}>Lenguajes de programación</span>

        {/**Pilar Javascript */}
        <img src={Pilar} alt="pilar" style={{ position: 'absolute', top: 510, left: 350, width: "100px" }} />
        <img src={JS} alt="pilar" style={{ position: 'absolute', top: 430, left: 350, width: "100px" }} />

        {/**Pilar Python */}
        <img src={Pilar} alt="pilar" style={{ position: 'absolute', top: 340, left: 770, width: "100px" }} />
        <img src={Python} alt="pilar" style={{ position: 'absolute', top: 250, left: 770, width: "100px" }} />

        {/**Pilar PHP */}
        <img src={Pilar} alt="pilar" style={{ position: 'absolute', top: 140, left: 1000, width: "100px" }} />
        <img src={PHP} alt="pilar" style={{ position: 'absolute', top: 70, left: 1000, width: "100px" }} />

        {/**Pilar MySQL */}
        <img src={Pilar} alt="pilar" style={{ position: 'absolute', top: 510, left: 1100, width: "100px" }} />
        <img src={MySql} alt="pilar" style={{ position: 'absolute', top: 410, left: 1100, width: "100px" }} />

        {/* mensaje icono */}
        {activeIcon && (
          <div
            className={classes.t_tip2}
            style={{
              position: 'absolute',
              left: activeIcon.msg_pos_left,
              top: activeIcon.msg_pos_top,
              width: activeIcon.s_width,
              height: activeIcon.s_height,
            }}
          >
            { activeIcon.message === 'JS' ? (
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                  Tengo más de cinco años trabajando en el ecosistema JavaScript, cubriendo de punta a punta la 
                  creación de aplicaciones web y móviles:
                </span>
                <ul>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      JavaScript y jQuery:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Manejo con fluidez ES6+ y conservo amplia práctica con jQuery para proyectos heredados o de rápida iteración.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Node JS:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Desarrollo servicios y APIs REST escalables en el mismo lenguaje.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      React JS / Next JS:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Construyo interfaces dinámicas con React y uso Next para SSR/SSG y optimización de rutas.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      MUI y Bootstrap:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Diseño UI accesibles y 100 % responsivas para desktop y mobile.
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                  <img src={RJS} alt="React JS" style={{ height: 48 }} />
                  <img src={JQUERY} alt="jQuery" style={{ height: 48 }} />
                  <img src={Node} alt="Node JS" style={{ height: 48 }} />
                  <img src={MUI} alt="Material UI" style={{ height: 48 }} />
                  <img src={Bootstrap} alt="Bootstrap" style={{ height: 48 }} />
                </div>
              </div>
            ): activeIcon.message === 'PY' ? (
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                  Cuento con amplia experiencia en Python, utilizando PyCharm para desarrollar:
                </span>
                <ul>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Apps de escritorio con bases de datos:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Creo interfaces locales que almacenan y gestionan datos de forma fiable.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Análisis y visualización:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Manejo Pandas y Matplotlib para transformar y exponer información con claridad usando Dataframes de data.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Back‑ends web:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Construyo APIs y servicios robustos con Django (stack completo) y FastAPI (alto rendimiento).
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Automatización e integración:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Desarrollo scripts que consumen o interactúan con sitios y APIs externas.
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                  <img src={Django} alt="Django" style={{ height: 48 }} />
                  <img src={Pandas} alt="Pandas" style={{ height: 48 }} />
                  <img src={Matplotlib} alt="MatplotlibS" style={{ height: 20, marginTop: 10 }} />
                  <img src={FastAPI} alt="FastApi" style={{ height: 20, marginTop: 10 }} />
                </div>
              </div>
            ) : activeIcon.message === 'PHP' ? (
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                  Cuento con sólida experiencia en PHP, enfocada en el diseño y despliegue de back‑ends robustos:
                </span>
                <ul>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Laravel y Lumen:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Desarrollo APIs y servicios escalables, aplicando el ecosistema Laravel para autenticación, 
                      migraciones, Eloquent ORM y pruebas, mientras que uso Lumen cuando se requiere máxima ligereza y velocidad.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Despliegue en producción:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Configuro servidores backend en máquinas virtuales, orquestando Nginx como reverse proxy y servidor web para 
                      garantizar rendimiento, seguridad y balanceo eficiente.
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                  <img src={Laravel} alt="Laravel" style={{ height: 48 }} />
                  <img src={Lumen} alt="Lumen" style={{ height: 48 }} />
                  <img src={Nginx} alt="Nginx" style={{ height: 48 }} />
                </div>
              </div>
            ) : activeIcon.message === 'SQL' ? (
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                  Poseo experiencia integral en bases de datos relacionales, centrada en MySQL / MariaDB y extendida a PostgreSQL:
                </span>
                <ul>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      MySQL / MariaDB en entornos locales:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Levanto y administro servidores mediante XAMPP y WAMP, definiendo usuarios, respaldos, replicación y ajustes de 
                      rendimiento para entornos de desarrollo y pruebas.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      PostgreSQL:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Diseño esquemas y consultas optimizadas, aprovechando funciones avanzadas (CTE, índices GIN/GiST) y extensiones cuando 
                      la solución requiere mayor robustez o funcionalidades geoespaciales.
                    </span>
                  </li>
                  <br/>
                  <li>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Servicios de bases de datos para APIs:
                    </span>
                    <br/>
                    <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                      Configuro instancias en servidores web o máquinas virtuales, asegurando conexión segura (SSL, roles) y abasteciendo back‑ends 
                      REST/GraphQL con datos consistentes y de alta disponibilidad.
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                  <img src={Postgre} alt="Postgre" style={{ height: 48 }} />
                  <img src={Xampp} alt="Xampp" style={{ height: 48 }} />
                  <img src={Wampp} alt="Wamp" style={{ height: 48 }} />
                </div>
              </div>
            ) : (<></>)}
          </div>
        )}

        {/**mensaje puerta 1 */}
        {isNearDoor && (
          <div
            className={classes.t_tip2}
            style={{
              position: 'absolute',
              left: DOOR_BOX.x + DOOR_BOX.width / 2 - 40, // centrado ±
              top:  DOOR_BOX.y - TOOLTIP_OFFSET - 90,      // 90 ≈ alto tooltip
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={EnterLogo} alt="Enter" style={{ width: 80, height: 80, marginBottom: 5 }} />
            <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
              Presiona 'Enter' para salir de la mansión
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