import React, { useContext } from "react";
import { useStyles } from "./style";
import { Tooltip, IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import IconoPersonalizado from '../assets/img/Icon.png';
import { MusicContext } from '../Views/MusicContext';

const TopBar = () => {
  const classes = useStyles();
  const { playMusic, pauseMusic, isPlaying } = useContext(MusicContext);

  const toggleMusic = () => {
    isPlaying ? pauseMusic() : playMusic();
  };

  return (
    <div className={classes.navbar}>
      <img src={IconoPersonalizado} alt="Icono" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
      <div style={{ width: "100px" }}>
        <Tooltip
          title="Presióname y añade un poco de música a tu aventura."
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '1rem', // Puedes ajustar este valor: '1.2rem', '16px', etc.
              },
            },
          }}
        >
          <IconButton
            onClick={toggleMusic}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            { isPlaying ? <MusicNoteIcon style={{ color: "#fff" }} /> : <MusicOffIcon style={{ color: "#fff" }} /> }
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;