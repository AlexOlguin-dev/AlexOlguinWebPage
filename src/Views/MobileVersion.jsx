import React from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import IconoPersonalizado from '../assets/img/Icon.png';
import cielo from '../assets/img/Map/Sky.gif'; // Importando la imagen
import FloorImg from '../assets/img/mobil/floor.png'; // Importando la imagen del suelo
import Titulo from '../assets/img/Titulo.png'; // Importando la imagen del título
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';

const MobileVersion = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${cielo})`, // Fondo con la imagen cielo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'auto', // Habilitar scroll
        position: 'relative', // Permite que los elementos dentro se posicionen relativos
      }}
    >
      {/* Navbar encima del fondo */}
      <AppBar
        position="absolute"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))',
          boxShadow: 'none',
          zIndex: 10, // Asegura que el Navbar esté encima del fondo
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

      {/* Imagen del título posicionada 200px por encima del suelo */}
      <Box
        sx={{
          position: 'absolute',
          top: '250px', // Ajustado 200px por encima del suelo (500px - 200px = 300px)
          left: '40%', // Centrado horizontalmente
          transform: 'translateX(-60%)', // Asegura el centrado exacto
        }}
      >
        <img src={Titulo} alt="Título" style={{ width: '150%', height: 'auto' }} />
      </Box>

      {/* Imagen del suelo posicionada a -100px desde el final de la pantalla */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-100px', // 100px debajo del final de la pantalla
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={FloorImg} alt="Suelo" style={{ width: '100%', height: 'auto' }} />
      </Box>

      {/* Div con el color #271937 y altura de 500px, ubicado justo en el fondo */}
      <Box
        sx={{
          position: 'absolute', // Asegura que el div esté en una posición absoluta
          bottom: -500, // Coloca el div justo al fondo de la pantalla
          left: 0,
          right: 0,
          backgroundColor: '#271937', // Color de fondo
          height: '500px', // Altura del div
          width: '100%', // Asegura que el div ocupe todo el ancho disponible
        }}
      />

      {/* Nuevo div debajo de la imagen del suelo */}
      <Box
        sx={{
          position: 'absolute',
          top: '600px', // Justo debajo de la imagen del suelo
          left: 0,
          right: 0,
          margin: '30px', // Margen de 5px
          border: '2px solid #61507A', // Borde de 2px de color #61507A
          backgroundColor: '#79A4BC', // Fondo de color #79A4BC
          padding: '10px', // Padding interno para mayor espacio
        }}
      >
        <span
          style={{
            fontSize: 25,
            fontFamily: "'VT323', monospace",
            color: '#DDEAC2', // Color del texto
          }}
        >
          ¡Hola! Bienvenidos... Soy Alex Olguín, un desarrollador web con sólida trayectoria,
          capaz de crear desde sitios livianos hasta plataformas complejas, cubriendo todo el ciclo
          de vida: análisis, arquitectura, desarrollo full‑stack y despliegue. Este breve portafolio
          es una muestra de mi habilidad para transformar ideas en soluciones digitales de calidad.
          Me adapto rápido, aprendo nuevas tecnologías con entusiasmo y colaboro eficazmente para
          impulsar los objetivos del negocio.
        </span>
      </Box>
    </Box>
  );
};

export default MobileVersion;