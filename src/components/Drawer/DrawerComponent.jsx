import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PointOfSale,PeopleAltRounded,Settings, Home, AttachMoney, Assessment } from '@mui/icons-material';
import AppBarComponent from '../AppBar/AppBarComponent';
import _handleRouteService from '../../service/route/_handleRouteService';

export default function DrawerComponent({history}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home','Buy', 'Customer', 'GoldPrice' , 'Report'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>_handleRouteService(history,text.toLowerCase())}>
              <ListItemIcon>
                {text=='Home'?<Home/>:text=='Buy'?<PointOfSale/>:text=='Customer'?<PeopleAltRounded/>:text=='GoldPrice'?<AttachMoney/>:<Assessment/>}
              </ListItemIcon>
              <ListItemText  primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <AppBarComponent history={history} onClick={toggleDrawer(anchor,true)}/>          
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
