import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {      
      primary: {
        main: '#daa741',
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