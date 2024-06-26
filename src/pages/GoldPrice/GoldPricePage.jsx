import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress
} from "@mui/material";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GoldPriceAPI from "../../api/Price/GoldPriceController";
import UpdateGoldPriceAPI from "../../api/Price/UpdateGoldPriceController";

export default function GoldPricePage({ history }) {
  const [priceID, setPriceID] = useState(null);
  const [lonePrice, setLonePrice] = useState("");
  const [ywayPrice, setYwayPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        const data = await GoldPriceAPI();
        const { priceID, lonePrice, ywayPrice } = data[0]; // Assuming response is an array with one item
        setPriceID(priceID);
        setLonePrice(lonePrice.toString()); // Convert to string to display in TextField
        setYwayPrice(ywayPrice.toString()); // Convert to string to display in TextField
      } catch (error) {
        toast.error("Failed to fetch gold prices");
      }
    };
    
    fetchGoldPrices();
  }, []);

  const handleUpdate = async () => {
    setIsLoading(true); // Set isLoading to true when update starts
    try {
      await UpdateGoldPriceAPI(priceID, lonePrice, ywayPrice);
      toast.success("Gold Price updated");
    } catch (error) {
      toast.error("Failed to update Gold Price");
    } finally {
      setIsLoading(false); // Set isLoading to false when update completes (whether success or failure)
    }
  };

  const handleClear = () => {
    setLonePrice("");
    setYwayPrice("");
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Box mt={3} ml={4} mr={3}>
        <Typography variant="h5" mt={3}>
          Update Gold Price
        </Typography>
        <Grid container mt={1} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Lone Price"
              variant="outlined"
              fullWidth
              value={lonePrice}
              type="number"
              onChange={(e) => setLonePrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Yway Price"
              variant="outlined"
              fullWidth
              value={ywayPrice}
              type="number"
              onChange={(e) => setYwayPrice(e.target.value)}
            />
          </Grid>
          <Grid mt={3} item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdate}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          </Grid>
          <Grid mt={3} item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClear}
              disabled={isLoading} // Disable button when loading
            >
              Clear
            </Button>
          </Grid>
        </Grid>
        {isLoading && <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>}
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
