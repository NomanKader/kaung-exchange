import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import _handleLogoutService from '../../service/auth/LogOutService';

export default function AppBarComponent({onClick,history}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{padding:10}} position="static">      
        <Toolbar variant="dense">
          <IconButton onClick={onClick} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color="inherit" component="div">
          ဟန်စည်-ရွှေသန့်စင်လုပ်ငန်း
          </Typography>                    
            <Button onClick={()=>_handleLogoutService(history)} sx={{position:'absolute',right:10}} color='error' variant='contained'>Logout</Button>                  
        </Toolbar>
      </AppBar>
    </Box>
  );
}
