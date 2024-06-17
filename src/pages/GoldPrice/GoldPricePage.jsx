import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid
} from "@mui/material";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function GoldPricePage({ history }) {
  const [ywayPrice, setYwayPrice] = useState("");
  const [lonePrice, setLonePrice] = useState("");

  const handleUpdate = () => {
    // Simulate API call
    axios.post('/api/update-gold-price', {
      ywayPrice,
      lonePrice
    }).then(response => {
      // Show toast message
      toast.success("Gold Price updated");
    }).catch(error => {
      // Handle error
      toast.error("Failed to update Gold Price");
    });
  };

  const handleClear = () => {
    setYwayPrice("");
    setLonePrice("");
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Box mt={3} ml={4} mr={3}>
        <Typography variant="h5" mt={3}>
          Update Gold Price
        </Typography>
        <Grid container mt={1} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Yway Price"
              variant="outlined"
              fullWidth
              value={ywayPrice}
              type="number"
              onChange={(e) => setYwayPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lone Price"
              variant="outlined"
              fullWidth
              value={lonePrice}
              type="number"
              onChange={(e) => setLonePrice(e.target.value)}              
            />
          </Grid>
          <Grid mt={3} item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
          <Grid mt={3} item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
