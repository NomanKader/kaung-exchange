import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Typography,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import theme from "../../theme";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _printVoucherService from "../../service/print/PrintService";

export default function BuyPage({ history }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [unitType, setUnitType] = useState("Yway");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch customer list from API
    axios.get("/api/customer-list") // replace with your API endpoint
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customer list", error);
      });
  }, []);

  useEffect(() => {
    // Update total amount whenever quantity or unit price changes
    setTotalAmount(quantity * unitPrice);
  }, [quantity, unitPrice]);

  const handleBuy = () => {
    // Call buy API (template)
    axios.post("/api/buy", {
      customer: selectedCustomer,
      unitType,
      quantity,
      unitPrice,
      totalAmount
    })
    .then(response => {
      toast.success("Buy successful");
      // Implement voucher print logic here
    })
    .catch(error => {
      toast.error("Error during buy");
      _printVoucherService();
    });
  };

  const handleClear = () => {
    setSelectedCustomer("");
    setUnitType("Yway");
    setQuantity("");
    setUnitPrice(0);
    setTotalAmount(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Box mt={3} mx={2}>
        <Typography variant="h6" align="center" fontWeight="bold" mb={2}>Buy Gold</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Customer</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Unit Type</FormLabel>
              <RadioGroup row value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                <FormControlLabel value="Yway" control={<Radio />} label="Yway" />
                <FormControlLabel value="Lone" control={<Radio />} label="Lone" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Unit Price"
              fullWidth
              value={unitPrice}
              disabled
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Total Amount"
              fullWidth
              value={totalAmount}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleBuy}>
              Buy
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
