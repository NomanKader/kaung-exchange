import  React,{useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Logo from "../../assets/logo.png";
import theme from "../../theme";
import CopyrightComponent from "../../components/Copyright/CopyrightComponent";
import LoginAPI from "../../api/auth/LoginController";
import BackDropComponent from "../../components/Loading/BackDropComponent";
// TODO remove, this demo shouldn't need to reset the theme.

export default function LoginPage({history}) {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const handleSubmit = async (e) => {
    setShowBackDrop(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("userName");
    const password = data.get("password");
    const postBody = {
      userName: username,
      password: password,
    };
    await LoginAPI(postBody,history);
    setShowBackDrop(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: '50%', height: '50%' }} />
            <Typography sx={{mt:2,mb:2}} component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
                type="text"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <a href="/auth/forgetpassword">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </a>
              <CopyrightComponent />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {showBackDrop && (
      <BackDropComponent/>
      )}
    </ThemeProvider>
  );
}
