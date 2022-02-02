import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useStyles } from './HeaderStyles';

import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { dataMenu } from "./DataMenu";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  
  const classes = useStyles();


  return (<div>
    <AppBar position="static">
        <Toolbar>
          <Hidden lgUp>
          <Button style={{color: '#fff'}} 
           id="basic-button"
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
          >
          <MenuIcon sx={{ flexGrow: 0.05 }} />
          </Button>
          </Hidden>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {dataMenu.map((item, i) => (
          <Link to={item.link}>
          <MenuItem>{item.label}</MenuItem>
          </Link>
        ))}
        
      </Menu>
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
            <Link to="/" style={{color: "#fff", textDecoration: "none"}}>AdminPanel</Link>
          </Typography>
          
          <Button color="inherit">Выйти</Button>
        </Toolbar>
      </AppBar>
  </div>);
}
