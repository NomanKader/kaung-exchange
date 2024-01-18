  import { Typography } from "@mui/material";
  function CopyrightComponent(props) {
      return (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          {...props}
          sx={{mt:5}}
        >
          {"Copyright © "}        
            KaungExchange-
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
    }
    export default CopyrightComponent;