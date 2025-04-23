import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  gosty: {
    width: '50px',
    height: '60px',
    transition: 'left 0.05s linear',
    imageRendering: 'pixelated',
  },
  main_div: {
    position: 'relative', 
    minHeight: '100vh', 
    backgroundColor: '#271937', 
    border: 'none'
  },
  navbar: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '60px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 20px', 
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)', 
    zIndex: 10
  },
  //Title
  titulo: {
    position: 'absolute', 
    top: 50, 
    left: 50, 
    width: '700px', 
    objectFit: 'cover', 
    imageRendering: 'pixelated'
  },
  desarrollador: {
    position: 'absolute', 
    top: 175, 
    left: 208, 
    fontSize: 70, 
    width: "365px", 
    textAlign: "center", 
    fontFamily: "'VT323', monospace", 
    color: "#DBEAC5"
  },
  web: {
    position: 'absolute', 
    top: 230, 
    left: 208, 
    fontSize: 70, 
    width: "365px", 
    textAlign: "center", 
    fontFamily: "'VT323', monospace", 
    color: "#DBEAC5"
  },
  //Decorations
  mansion: {
    position: 'absolute', 
    top: 220, 
    left: 980, 
    width: '400px', 
    objectFit: 'cover', 
    imageRendering: 'pixelated'
  },
  letrero: {
    position: 'absolute', 
    top: 400, 
    left: 0, 
    width: '200px', 
    objectFit: 'cover', 
    imageRendering: 'pixelated'
  },
  suelo: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    width: '100%', 
    height: '200px', 
    objectFit: 'cover', 
    imageRendering: 'pixelated'
  },
  plataforma: {
    position: 'absolute', 
    left: 300, 
    top: 380, 
    width: 200, 
    height: 20, 
    height: '70px', 
    imageRendering: 'pixelated',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center'
  },
  palanca: {
    bottom: 200,
    width: 180,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30% 105%',
    imageRendering: 'pixelated',
    zIndex: 2,
  },
  //mensajes
  t_tip: {
    width: '160px',
    height: '160px',
    padding: '5px 10px',
    backgroundColor: '#73A4BB',
    color: '#DCEAC4',
    border: '3px solid #625079',
    fontSize: '12px',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  m_palanca: {
    position: 'absolute',
    left: 800,
    top: 70,
    width: 600,
    height: 230,
    padding: '5px 10px',
    backgroundColor: '#73A4BB',
    color: '#DCEAC4',
    border: '3px solid #625079',
    zIndex: 3,
    fontFamily: "'VT323', monospace",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  }
});