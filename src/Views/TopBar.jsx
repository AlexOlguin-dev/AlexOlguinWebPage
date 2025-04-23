import React from "react";
import { useStyles } from "./style";
import { IconButton } from '@mui/material';
import '../assets/css/animated_functions.css';
import TranslateIcon from '@mui/icons-material/Translate';
import IconoPersonalizado from '../assets/img/Icon.png';

const TopBar = () => {
  const classes = useStyles();
  return(
    <div className={classes.navbar}>
      <img src={IconoPersonalizado} alt="Icono" style={{ width: '40px', height: '40px', objectFit: 'contain' }}/>
      <div style={{ width: "100px" }}>
        <IconButton edge="start" color="inherit" aria-label="translate">
          <TranslateIcon style={{ color: "#fff" }} />
        </IconButton>
      </div>
    </div>
  )
}

export default TopBar;