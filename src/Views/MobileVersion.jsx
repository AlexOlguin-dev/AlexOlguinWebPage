import React, { useEffect, useState, useRef } from 'react';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import IconoPersonalizado from '../assets/img/Icon.png';
import cielo from '../assets/img/Map/Sky.gif';
import Titulo from '../assets/img/Titulo_mobil.png';
import PlatformImg from '../assets/img/Map/floor.png';
import QuestionBox from '../assets/img/Map/InfoBox.png';
import GostyImg from '../assets/img/MainCharacter/Gosty.png';
import Fondo2 from '../assets/img/mobil/fondo_2.png';
import Cartel from '../assets/img/mobil/cartel.png';
import JS from '../assets/img/Lenguajes/JavaScript.png';
import RJS from '../assets/img/Lenguajes/React.png';
import JQUERY from '../assets/img/Lenguajes/jQuery.png';
import Node from '../assets/img/Lenguajes/node.png';
import MUI from '../assets/img/Lenguajes/MUI.png';
import Bootstrap from '../assets/img/Lenguajes/bootstrap.png';
import Python from '../assets/img/Lenguajes/python.png';
import Django from '../assets/img/Lenguajes/django.png';
import FastAPI from '../assets/img/Lenguajes/fastapi.png';
import Pandas from '../assets/img/Lenguajes/pandas.png';
import Matplotlib from '../assets/img/Lenguajes/matplotlib.png';
import PHP from '../assets/img/Lenguajes/php.png';
import Lumen from '../assets/img/Lenguajes/lumen.png';
import Laravel from '../assets/img/Lenguajes/laravel.png';
import Nginx from '../assets/img/Lenguajes/ngnex.png';
import MySql from '../assets/img/Lenguajes/mysql.png';
import Postgre from '../assets/img/Lenguajes/postgres.png';
import Wampp from '../assets/img/Lenguajes/wampp.png';
import Xampp from '../assets/img/Lenguajes/xampp.png';
import mar from '../assets/img/Map/ocean.gif';
import Platform from '../assets/img/mobil/platform.png';
import FishImg1 from '../assets/img/Map/fish_1.gif';
import FishImg2 from '../assets/img/Map/fish_2.gif';
import sunset from '../assets/img/mobil/sunset.gif';
import TituloFinal from '../assets/img/Titulo_final.png';
import { FaWhatsapp } from "react-icons/fa";

const MobileVersion = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);

  const fishRef = useRef({ x: 0, direction: 1 });

  useEffect(() => {
    const moveSpeed = 2;
    const interval = setInterval(() => {
      setPosition(prev => {
        const nextPos = prev + moveSpeed * direction;
        const maxWidth = window.innerWidth - 50; 

        if (nextPos >= maxWidth) {
          setDirection(-1);
          return maxWidth;
        } else if (nextPos <= 0) {
          setDirection(1);
          return 0;
        }
        return nextPos;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    let jumpInterval;
    if (isJumping) {
      const gravity = 1; // fuerza de gravedad
      let velocity = -15; // velocidad inicial hacia arriba

      jumpInterval = setInterval(() => {
        setJumpHeight(prev => {
          const newHeight = prev + velocity;
          velocity += gravity; // la gravedad lo trae hacia abajo

          if (newHeight >= 0) {
            clearInterval(jumpInterval);
            setIsJumping(false);
            return 0;
          }
          return newHeight;
        });
      }, 16);
    }
    return () => clearInterval(jumpInterval);
  }, [isJumping]);

  const handleTap = () => {
    if (!isJumping) {
      setIsJumping(true);
    }
  };

  const fishSprite = fishRef.current.direction === 1 ? FishImg1 : FishImg2;

  return (
    <Box
      onClick={handleTap}
      sx={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: `url(${cielo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {/* APP BAR */}
      <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))', paddingX: 1, paddingY: 0.5 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '48px !important' }}>
          <Box component="img" src={IconoPersonalizado} alt="Icono" sx={{ height: 32 }} />
          <IconButton color="inherit">
            <TranslateIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* APP BAR */}

      {/* Contenido principal */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, position: 'relative' }}>

        {/* Título */}
        <Box component="img" src={Titulo} alt="Título" sx={{ maxWidth: '80%', height: 'auto', mb: 20, mt: 20 }} />

        {/* GOSTY */}
        <Box
          component="img"
          src={GostyImg}
          alt="Gosty"
          sx={{
            position: 'absolute',
            top: `${380 + jumpHeight}px`,
            left: position,
            width: 50,
            height: 60,
            transform: direction === 1 ? 'scaleX(1)' : 'scaleX(-1)',
            transition: isJumping ? 'none' : 'transform 0.2s',
            zIndex: 10
          }}
        />

        {/* Presentacion */}
        <Box sx={{ width: '100%', color: 'white', backgroundImage: 'linear-gradient(to bottom, #271937, black)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', paddingBottom: "50px" }}>
          <img src={PlatformImg} alt="Plataforma" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#73A4BB', color: '#DCEAC4', border: '3px solid #625079', textAlign: 'center' }}>
            <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
              ¡Hola! Bienvenidos... Soy Alex Olguín, un desarrollador web con sólida trayectoria, 
              capaz de crear desde sitios livianos hasta plataformas complejas, cubriendo todo el ciclo de vida: 
              análisis, arquitectura, desarrollo full‑stack y despliegue. Este breve portafolio es una muestra de 
              mi habilidad para transformar ideas en soluciones digitales de calidad. Me adapto rápido, aprendo 
              nuevas tecnologías con entusiasmo y colaboro eficazmente para impulsar los objetivos del negocio.
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={QuestionBox} alt="Info Icon" style={{ width: 30, height: 30, marginTop: 8 }} />
            </div>
          </Box>
        </Box>

        {/**Lenguajes */}
        <Box sx={{ width: '100%', backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0,0,0,0) 150px), url(${Fondo2})`, backgroundSize: 'contain', marginTop: -2, position: "relative" }}>

          <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#C53946', color: '#DCEAC4', border: '3px solid #EBC250', position: "absolute", top: 30, minWidth: "310px" }}>
            <span style={{ fontSize: 30, fontFamily: "'VT323', monospace" }}>Lenguajes de Programación</span>
          </Box>

          <Box style={{ position: 'relative' }}>
            <img src={Cartel} alt="Cartel" style={{ width: '60%', height: 'auto', objectFit: 'contain', marginTop: "100px" }} />
            <img src={JS} alt="JavaScript" style={{ width: '20%', height: 'auto', objectFit: 'contain', position: 'absolute', top: '65%', left: '18.5%' }} />
          </Box>
          
          <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#C53946', color: '#DCEAC4', border: '3px solid #EBC250',}}>
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
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Manejo con fluidez ES6+ y conservo amplia práctica con jQuery para proyectos heredados o de rápida iteración.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Node JS:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Desarrollo servicios y APIs REST escalables en el mismo lenguaje.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    React JS :
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Construyo interfaces dinámicas con React JS para plataformas web altamente interactivas.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    MUI y Bootstrap:
                  </span>
                  <br/>
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

          <Box style={{ position: 'relative' }}>
            <img src={Cartel} alt="Cartel" style={{ width: '60%', height: 'auto', objectFit: 'contain', marginTop: "50px", transform: 'scaleX(-1)', marginLeft: "40%" }} />
            <img src={Python} alt="Python" style={{ width: '20%', height: 'auto', objectFit: 'contain', position: 'absolute', top: '57.5%', left: '61.5%' }} />
          </Box>

          <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#C53946', color: '#DCEAC4', border: '3px solid #EBC250',}}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                Cuento con amplia experiencia en Python, utilizando PyCharm para desarrollar:
              </span>
              <ul>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Apps de escritorio con bases de datos:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Creo interfaces locales que almacenan y gestionan datos de forma fiable.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Análisis y visualización:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Manejo Pandas y Matplotlib para transformar y exponer información con claridad usando Dataframes de data.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Back‑ends web:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Construyo APIs y servicios robustos con Django (stack completo) y FastAPI (alto rendimiento).
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Automatización e integración:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Desarrollo scripts que consumen o interactúan con sitios y APIs externas.
                  </span>
                </li>
              </ul>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                <img src={Django} alt="Django" style={{ height: 48 }} />
                <img src={Pandas} alt="Pandas" style={{ height: 48 }} />
              </div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                <img src={Matplotlib} alt="MatplotlibS" style={{ height: 20, marginTop: 10 }} />
                <img src={FastAPI} alt="FastApi" style={{ height: 20, marginTop: 10 }} />
              </div>
            </div>
          </Box>

          <Box style={{ position: 'relative' }}>
            <img src={Cartel} alt="Cartel" style={{ width: '60%', height: 'auto', objectFit: 'contain', marginTop: "100px" }} />
            <img src={PHP} alt="PHP" style={{ width: '20%', height: 'auto', objectFit: 'contain', position: 'absolute', top: '65%', left: '18.5%' }} />
          </Box>
          
          <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#C53946', color: '#DCEAC4', border: '3px solid #EBC250',}}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: 22, fontFamily: "'VT323', monospace" }}>
                Cuento con sólida experiencia en PHP, enfocada en el diseño y despliegue de back‑ends robustos:
              </span>
              <ul>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Laravel y Lumen:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Desarrollo APIs y servicios escalables, aplicando el ecosistema Laravel para autenticación, 
                    migraciones, Eloquent ORM y pruebas, mientras que uso Lumen cuando se requiere máxima ligereza y velocidad.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Despliegue en producción:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
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
          </Box>

          <Box style={{ position: 'relative' }}>
            <img src={Cartel} alt="Cartel" style={{ width: '60%', height: 'auto', objectFit: 'contain', marginTop: "50px", transform: 'scaleX(-1)', marginLeft: "40%" }} />
            <img src={MySql} alt="MySql" style={{ width: '16%', height: 'auto', objectFit: 'contain', position: 'absolute', top: '60%', left: '65%' }} />
          </Box>

          <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#C53946', color: '#DCEAC4', border: '3px solid #EBC250',}}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                Poseo experiencia integral en bases de datos relacionales, centrada en MySQL / MariaDB y extendida a PostgreSQL:
              </span>
              <ul>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    MySQL / MariaDB en entornos locales:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Levanto y administro servidores mediante XAMPP y WAMP, definiendo usuarios, respaldos, replicación y ajustes de 
                    rendimiento para entornos de desarrollo y pruebas.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    PostgreSQL:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                    Diseño esquemas y consultas optimizadas, aprovechando funciones avanzadas (CTE, índices GIN/GiST) y extensiones cuando 
                    la solución requiere mayor robustez o funcionalidades geoespaciales.
                  </span>
                </li>
                <br/>
                <li>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace", fontWeight: 'bold' }}>
                    Servicios de bases de datos para APIs:
                  </span>
                  <br/>
                  <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
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
          </Box>

          <Box sx={{ width: '100%', color: 'white', backgroundImage: `url(${mar})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', paddingBottom: "100px", position: "relative" }}>
            <img src={Platform} alt="Plataforma" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />

            <Box style={{ margin: "20px", padding: "10px", backgroundColor: '#C53946', color: '#DCEAC4', border: '3px solid #EBC250', position: "absolute", top: 40, minWidth: "310px" }}>
              <span style={{ fontSize: 30, fontFamily: "'VT323', monospace" }}>Portafolio</span>
            </Box>
            
            {/* Pez animado que se mueve de un extremo a otro, con hover */}
            <div style={{ position: "relative", width: '100px', height: '100px', zIndex: 10, marginLeft: "120px", paddingTop: "150px" }}  onClick={() => window.open('https://chat-room-two-green.vercel.app/', '_blank')}>
              <img
                src={require('../assets/img/Map/dialogo.png')}
                alt="Dialogo"
                style={{
                  position: 'absolute',
                  top: -85, // Ajusta según lo alto que quieras el diálogo
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 300,
                }}
              />
              <img src={fishSprite} alt="Pez" style={{ width: '100%', height: '100%' }}/>
            </div>
            
          </Box>

          <Box sx={{ width: '100%', color: 'white', backgroundImage: `url(${sunset})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', paddingBottom: "50px", position: "relative" }}>
            <img src={Platform} alt="Plataforma" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, position: 'relative' }}>
              <Box component="img" src={TituloFinal} alt="Título" sx={{ maxWidth: '80%', height: 'auto', mb: 20, mt: 20 }} />
              <Box style={{ position: 'absolute', top: 240, left: "17%", color: "#DDEAC2" }}>
                <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                  E-Mail:
                </span>
                <br/>
                <span style={{ fontSize: 23, fontFamily: "'VT323', monospace", fontWeight: "bold" }}>
                  alex.olguin.erpel@gmail.com
                </span>
                <br/>
                <span style={{ fontSize: 15, fontFamily: "'VT323', monospace" }}>
                  Whatsapp:
                </span>
                <br/>
                <a href="https://wa.me/56989090514" target="_blank" rel="noopener noreferrer" style={{ color: "#DDEAC2", textDecoration: 'none' }} >
                  <span style={{ display: "flex", alignItems: "center", fontSize: 30, fontFamily: "'VT323', monospace", fontWeight: "bold", gap: 8 }}>
                    +56989090514 <FaWhatsapp />
                  </span>
                </a>
              </Box>
            </Box>
          </Box>

        </Box>

      </Box>
    </Box>
  );
};

export default MobileVersion;