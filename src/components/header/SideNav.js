import { Box, Drawer, Paper } from '@mui/material';
import React from 'react';
import { useStyles } from './HeaderStyles';
import SidenavData from './SidenavData';
const drawerWidth = 240;

export default function SideNav() {

   
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

const classes = useStyles();

  return (<Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} 
    style={classes.drawer}
  >
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Drawer
      variant="temporary"
      anchor={'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none', lg: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <SidenavData />
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'none', lg: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
      classes={{
          paper: classes.drawerPaper
      }}
    >
    <SidenavData />
    </Drawer>
  </Box>);
}
