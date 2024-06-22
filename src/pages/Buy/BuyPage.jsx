import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import theme from "../../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyGoldAPI from "../../api/Buy/CreateBuyController";
import GetCustomerAPI from "../../api/Customer/GetCustomerController";
import Autocomplete from "@mui/material/Autocomplete";
import GoldPriceAPI from "../../api/Price/GoldPriceController";
import _handlePrintService from '../../service/print/PrintService';

export default function BuyPage({ history }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [unitQuantities, setUnitQuantities] = useState({
    loneQty: "",
    paeQty: "",
    ywayQty: "",
    siQty: "",
  });
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [customerSelected, setCustomerSelected] = useState(true); // State to manage customer selection

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    fetchGoldPrice("Yway");
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [unitQuantities]);

  const fetchCustomers = async () => {
    try {
      const customerData = await GetCustomerAPI();
      setCustomers(customerData);
    } catch (error) {
      console.error("Error fetching customer list", error);
      toast.error("Failed to fetch customers");
    }
  };

  const fetchGoldPrice = async (type) => {
    try {
      const goldPriceData = await GoldPriceAPI();
      const price = goldPriceData[0].lonePrice;
      setUnitPrice(price);
      calculateTotalAmount();
    } catch (error) {
      console.error("Error fetching gold price", error);
      toast.error("Failed to fetch gold price");
    }
  };

  const calculateTotalAmount = () => {
    let totalLoneQty = 0;

    totalLoneQty +=
      unitQuantities.loneQty !== "" ? parseFloat(unitQuantities.loneQty) : 0;
    totalLoneQty +=
      unitQuantities.paeQty !== ""
        ? parseFloat(unitQuantities.paeQty) * 3.125
        : 0;
    totalLoneQty +=
      unitQuantities.ywayQty !== ""
        ? parseFloat(unitQuantities.ywayQty) / 8 * 3.125
        : 0;
    totalLoneQty +=
      unitQuantities.siQty !== "" ? parseFloat(unitQuantities.siQty) / 16 : 0;

    const amount = totalLoneQty * unitPrice;
    const roundedAmount = Math.round(amount); // Round to nearest whole number
    setTotalAmount(roundedAmount);    
  };
  const formatQuantity = () => {
    let formattedQuantity = "";

    if (unitQuantities.loneQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.loneQty)}လုံး`;
    }
    if (unitQuantities.paeQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.paeQty)}ပဲ`;
    }
    if (unitQuantities.ywayQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.ywayQty)}ရွေး`;
    }
    if (unitQuantities.siQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.siQty)}စိ`;
    }

    return formattedQuantity;
  };
  const handleBuy = async () => {
    setLoading(true);

    if (!selectedCustomer) {
      toast.error("Please select a customer.");
      setCustomerSelected(false);
      setLoading(false);
      return;
    }

    const { loneQty } = unitQuantities;
    const quantity = loneQty !== "" ? parseFloat(loneQty) : 0;

    await BuyGoldAPI(
      selectedCustomer.id,
      "Lone",
      quantity,
      unitPrice,
      totalAmount,
      "10000"
    )
      .then(() => {
        toast.success("Buy successful");
        const quantity = formatQuantity();
        _handlePrintService(selectedCustomer.customerName, quantity, unitPrice+' ကျပ်', totalAmount+' ကျပ်');    
      })
      .catch((error) => {
        toast.error("Error during buy");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClear = () => {
    setSelectedCustomer(null);
    setUnitQuantities({
      loneQty: "",
      paeQty: "",
      ywayQty: "",
      siQty: "",
    });
    setUnitPrice(0);
    setTotalAmount(0);
    setCustomerSelected(true);
  };

  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);
    setCustomerSelected(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Box mt={3} mx={2}>
        <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
          Buy Gold
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              value={selectedCustomer}
              onChange={handleCustomerChange}
              options={customers}
              getOptionLabel={(option) => option.customerName}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" fullWidth />
              )}
            />
            {!customerSelected && (
              <Typography variant="body2" color="error">
                Please select a customer.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Enter Lone Qty"
              fullWidth
              value={unitQuantities.loneQty}
              onChange={(e) =>
                setUnitQuantities({
                  ...unitQuantities,
                  loneQty: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Enter Pae Qty"
              fullWidth
              value={unitQuantities.paeQty}
              onChange={(e) =>
                setUnitQuantities({
                  ...unitQuantities,
                  paeQty: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Enter Yway Qty"
              fullWidth
              value={unitQuantities.ywayQty}
              onChange={(e) =>
                setUnitQuantities({
                  ...unitQuantities,
                  ywayQty: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Enter Si Qty"
              fullWidth
              value={unitQuantities.siQty}
              onChange={(e) =>
                setUnitQuantities({
                  ...unitQuantities,
                  siQty: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Amount"
              fullWidth
              value={totalAmount}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={1}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClear}              
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuy}
              disabled={!customerSelected || totalAmount === 0 || loading}
              size='large'
            >
              {loading ? "Buying..." : "Buy"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
