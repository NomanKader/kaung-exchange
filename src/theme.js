import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {      
      primary: {
        main: '#8b4fdf',
        contrastText: "#fff"
      },
      secondary:{
        main:'#178ed4'
      },
      accent:{
        main:'#ECF6FF'
      },
      text:{
        main:'#fff'
      },
      success:{
        main:'#008080'
      },
      warning:{
        main:'#FFA700'
      }
    },
  });
  export default theme;