import { Typography } from "@mui/material";
function CopyrightComponent(props) {
    return (
        <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
        sx={{mt:5}}
      >
        {"Copyright © "}        
          HanSeeGold-
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" align="center" sx={{mt:3}}>
        Powered By <a href="www.nksoftwarehouse.com">NK Software House</a>
      </Typography>
      </>
    );
  }
  export default CopyrightComponent;