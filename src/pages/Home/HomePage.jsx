import React from "react";
import {
  Paper,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Box
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import theme from '../../theme';
import _handleRouteService from "../../service/route/_handleRouteService";

const HomePage = ({ history }) => {
  const customTheme = useTheme();
  const isMobile = useMediaQuery(customTheme.breakpoints.down("sm"));

  const items = [
    { icon: <ShoppingCartIcon sx={{ fontSize: 50 }} />, name: "Buy" },
    { icon: <AttachMoneyIcon sx={{ fontSize: 50 }} />, name: "GoldPrice" },
    { icon: <PeopleIcon sx={{ fontSize: 50 }} />, name: "Customer" },
    { icon: <AssessmentIcon sx={{ fontSize: 50 }} />, name: "Report" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Grid container spacing={2} mt={3} direction={isMobile ? "column" : "row"}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <Box
              onClick={() => _handleRouteService(history, item.name.toLowerCase())}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  margin: 3,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 150,
                  textAlign: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {item.icon}
                <Typography variant="h6" fontWeight={'bold'}>{item.name}</Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default HomePage;
