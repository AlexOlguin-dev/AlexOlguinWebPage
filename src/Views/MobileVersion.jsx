import React, { useState, useEffect } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import IconoPersonalizado from '../assets/img/Icon.png';
import cielo from '../assets/img/Map/Sky.gif';
import FloorImg from '../assets/img/mobil/floor.png';
import Titulo from '../assets/img/Titulo_mobil.png';
import QuestionBox from '../assets/img/Map/InfoBox.png';
import GostyImg from '../assets/img/MainCharacter/Gosty.png';
import GostyImg2 from '../assets/img/MainCharacter/Gosty_2.png';
import FondoLobby from '../assets/img/mobil/Fondo_lobby.png';
import Cartel from '../assets/img/mobil/cartel.png';
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
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';

const MobileVersion = () => {
  const [movingRight, setMovingRight] = useState(true);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMovingRight(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300);
    }
  };

  return (
    <Box onClick={handleJump} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundImage: `url(${cielo})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', overflow: 'auto', position: 'relative' }}>
      <AppBar
        position="absolute"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))',
          boxShadow: 'none',
          zIndex: 10,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 'auto' }}>
          <IconButton edge="start" disableRipple>
            <img src={IconoPersonalizado} alt="Icono" style={{ height: 32 }} />
          </IconButton>
          <IconButton edge="end" disableRipple>
            <TranslateIcon style={{ color: '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: 'absolute',
          top: '250px',
          left: '40%',
          transform: 'translateX(-60%)',
        }}
      >
        <img src={Titulo} alt="Título" style={{ width: '150%', height: 'auto' }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '-100px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={FloorImg} alt="Suelo" style={{ width: '100%', height: 'auto' }} />
      </Box>

      {/* Gosty animado */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '150px',
          left: 0,
          animation: 'moveGosty 5s linear infinite',
          transform: isJumping ? 'translateY(-30px)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
          '@keyframes moveGosty': {
            '0%': { left: '0%' },
            '50%': { left: '85%' },
            '100%': { left: '0%' },
          },
        }}
      >
        <img src={movingRight ? GostyImg : GostyImg2} alt="Gosty" style={{ width: '50px', height: 'auto' }}/>
      </Box>

      <Box sx={{ position: 'absolute', bottom: -500, left: 0, right: 0, backgroundColor: '#271937', height: '500px', width: '100%' }}>

        <Box sx={{ margin: '30px', border: '2px solid #61507A', backgroundColor: '#79A4BC', padding: '10px', zIndex: 3 }}>
          <span style={{ fontSize: 22, fontFamily: "'VT323', monospace", color: '#DDEAC2' }}>
            ¡Hola! Bienvenidos... Soy Alex Olguín, un desarrollador web con sólida trayectoria,
            capaz de crear desde sitios livianos hasta plataformas complejas, cubriendo todo el ciclo
            de vida: análisis, arquitectura, desarrollo full‑stack y despliegue. Este breve portafolio
            es una muestra de mi habilidad para transformar ideas en soluciones digitales de calidad.
            Me adapto rápido, aprendo nuevas tecnologías con entusiasmo y colaboro eficazmente para
            impulsar los objetivos del negocio.
          </span>
        </Box>

        <Box sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <img src={QuestionBox} alt="InfoBox" style={{ width: '50px', height: 'auto' }} />
        </Box>

        <Box style={{ marginTop: -50, paddingTop: 500, backgroundImage: `url(${FondoLobby})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', zIndex: 1 }}>
          {/* Contenedor relativo para posicionar el ícono JS */}
          <Box style={{ position: 'relative', margin: '0px 60px 30px 10px' }}>
            
            {/* Ícono JS con posición absoluta */}
            <img src={Cartel} alt="JavaScript" style={{ position: 'absolute', top: -200, left: -10, height: 210 }}/>
            <img src={JS} alt="JavaScript" style={{ position: 'absolute', top: -100, left: 70, height: 90 }}/>

            {/* Contenido principal */}
            <Box
              style={{
                backgroundColor: '#C53946',
                color: '#DCEAC4',
                border: '3px solid #EBC250',
                padding: '10px',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                  Tengo más de cinco años trabajando en el ecosistema JavaScript, cubriendo de punta a punta la
                  creación de aplicaciones web y móviles:
                </span>
                <ul>
                  <li>
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      JavaScript y jQuery:
                    </span>
                    <br />
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                      Manejo con fluidez ES6+ y conservo amplia práctica con jQuery para proyectos heredados o de rápida iteración.
                    </span>
                  </li>
                  <br />
                  <li>
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      Node JS:
                    </span>
                    <br />
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                      Desarrollo servicios y APIs REST escalables en el mismo lenguaje.
                    </span>
                  </li>
                  <br />
                  <li>
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      React JS / Next JS:
                    </span>
                    <br />
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                      Construyo interfaces dinámicas con React y uso Next para SSR/SSG y optimización de rutas.
                    </span>
                  </li>
                  <br />
                  <li>
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                      MUI y Bootstrap:
                    </span>
                    <br />
                    <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                      Diseño UI accesibles y 100 % responsivas para desktop y mobile.
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                  <img src={RJS} alt="React JS" style={{ height: 48 }} />
                  <img src={JQUERY} alt="jQuery" style={{ height: 48 }} />
                  <img src={Node} alt="Node JS" style={{ height: 48 }} />
                </div>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                  <img src={MUI} alt="Material UI" style={{ height: 48 }} />
                  <img src={Bootstrap} alt="Bootstrap" style={{ height: 48 }} />
                </div>
              </div>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default MobileVersion;