import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import { Typography, Grid } from "@mui/material";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import NotFoundImage from '../../assets/notfound.png'

const NotFoundPage = ({ history }) => {
  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item>
          <img src={NotFoundImage} alt="Not Found" style={{ maxWidth: "100%", height: "auto" }} />
        </Grid>
        <Grid item mt={3}>
          <Typography variant="h6" align="center" fontWeight="bold">
            Sorry, the page you are looking for does not exist.
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default NotFoundPage;
