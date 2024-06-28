import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl  
} from "@mui/material";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import theme from "../../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyGoldAPI from "../../api/Buy/CreateBuyController";
import GetCustomerAPI from "../../api/Customer/GetCustomerController";
import Autocomplete from "@mui/material/Autocomplete";
import GoldPriceAPI from "../../api/Price/GoldPriceController";
import _handlePrintService from "../../service/print/PrintService";
import GetBuyAPI from "../../api/Buy/GetBuyController";
import dayjs from "dayjs";
import PaperComponent from "../../components/Paper/PaperComponent";

export default function BuyPage({ history }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [unitQuantities, setUnitQuantities] = useState({
    loneQty: "",
    paeQty: "",
    ywayQty: "",
    siQty: "",
    bfLoneQty: "",
    bfYwayQty: "",
    bfSiQty: "",
  });
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [customerSelected, setCustomerSelected] = useState(true); // State to manage customer selection
  const [totalKyatAmount, setTotalKyatAmount] = useState("");
  const [totalBuyAmount,setTotalBuyAmount]=useState("");
  const [unitType, setUnitType] = useState("LS");
  const [goldPriceData, setGoldPriceData] = useState();
  const [disableBuy,setDisableBuy]=useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchBuyData();
  }, []);
   
  useEffect(()=>{
    if(unitType=='LS'){
      if(unitQuantities.loneQty!="" && unitQuantities.siQty!="" && unitQuantities.bfLoneQty!="" && unitQuantities.bfSiQty!=""){
        setDisableBuy(false);
      }
      else{
        setDisableBuy(true);
      }
    }
    else{
      if(unitQuantities.ywayQty!="" && unitQuantities.bfYwayQty!=""){
        setDisableBuy(false);
      }
      else{
        setDisableBuy(true);
      }
    }
  },[unitType,unitQuantities])

  const fetchBuyData = async () => {
    console.log("Selected Customer", selectedCustomer);
    const response = await GetBuyAPI(
      dayjs().format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
      ""
    );
    const totalKyatAmount = response
      .reduce((acc, item) => acc + parseFloat(item.kyatAmount), 0)
      .toFixed(2);
    const totalBuyAmount = response
      .reduce((acc, item) => acc + parseFloat(item.totalAmount), 0)
      .toFixed(2);    
    setTotalKyatAmount(totalKyatAmount);
    setTotalBuyAmount(totalBuyAmount);
  };

  useEffect(() => {
    fetchGoldPrice();
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

  const fetchGoldPrice = async () => {
    try {
      const data = await GoldPriceAPI();
      setGoldPriceData(data);
      const price = data[0].lonePrice;
      setUnitPrice(price);
      calculateTotalAmount();
    } catch (error) {
      console.error("Error fetching gold price", error);
      toast.error("Failed to fetch gold price");
    }
  };

  const calculateTotalAmount = () => {
    let totalLoneQty = 0;
    if (unitType == "LS") {
      totalLoneQty +=
        unitQuantities.loneQty !== "" ? parseFloat(unitQuantities.loneQty) : 0;
      totalLoneQty +=
        unitQuantities.paeQty !== ""
          ? parseFloat(unitQuantities.paeQty) * 3.125
          : 0;
      totalLoneQty +=
        unitQuantities.ywayQty !== ""
          ? parseFloat(unitQuantities.ywayQty) * parseInt(unitPrice)
          : 0;
      totalLoneQty +=
        unitQuantities.siQty !== "" ? parseFloat(unitQuantities.siQty) / 16 : 0;

      const amount = totalLoneQty * unitPrice;
      const roundedAmount = Math.round(amount); // Round to nearest whole number
      setTotalAmount(roundedAmount);
    } else {
      let ywayAmount =
        unitQuantities.ywayQty !== "" ? parseFloat(unitQuantities.ywayQty) : 0;
      console.log("Unit Price", unitPrice);
      setTotalAmount(ywayAmount * unitPrice);
    }
  };

  const formatQuantity = () => {
    let formattedQuantity = "";

    if (unitQuantities.loneQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.loneQty) || 0}လုံး`;
    }
    if (unitQuantities.paeQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.paeQty) || 0}ပဲ`;
    }
    if (unitQuantities.ywayQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.ywayQty) || 0}ရွေး`;
    }
    if (unitQuantities.siQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.siQty) || 0}စိ`;
    }

    return formattedQuantity;
  };
  const bfFormatQuantity = () => {
    let formattedQuantity = "";

    if (unitQuantities.loneQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.bfLoneQty) || 0}လုံး`;
    }    
    if (unitQuantities.ywayQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.bfYwayQty) || 0}ရွေး`;
    }
    if (unitQuantities.siQty !== "") {
      formattedQuantity += `${parseFloat(unitQuantities.bfSiQty) || 0}စိ`;
    }

    return formattedQuantity;
  };
  const handleRadio = (value) => {
    if (value == "LS") {
      setUnitPrice(parseInt(goldPriceData[0].lonePrice));
      unitQuantities.ywayQty = "";
      setUnitType("LS");
      setTotalAmount(0);
    } else {
      console.log("Gold Price Data", goldPriceData[0]);
      setUnitPrice(parseInt(goldPriceData[0].ywayPrice));
      unitQuantities.loneQty = "";
      unitQuantities.siQty = "";
      setTotalAmount(0);
      setUnitType("Yway");
    }
  };
  const handleBuy = async () => {
    setLoading(true);

    if (!selectedCustomer) {
      toast.error("Please select a customer.");
      setCustomerSelected(false);
      setLoading(false);
      return;
    }
    let kyat = "0";
    if (unitType == "LS") {
      const { siQty } = unitQuantities;
      const { loneQty } = unitQuantities;
      let lone = parseInt(siQty || 0) / 16;
      let totalLoneQty = lone + parseInt(loneQty || 0);
      let pae = parseInt(totalLoneQty || 0) / 3.125;
      kyat = pae / 16;
    } else {
      const { ywayQty } = unitQuantities;
      let pae = parseInt(ywayQty || 0) / 8;
      kyat = pae / 16;
    }

    console.log("Kyat", kyat.toString());
    await BuyGoldAPI(
      selectedCustomer.customerName,
      parseInt(unitQuantities.ywayQty) || 0,
      parseInt(unitQuantities.loneQty) || 0,
      parseInt(unitQuantities.paeQty) || 0,
      parseInt(unitQuantities.siQty) || 0,
      parseInt(unitPrice),
      parseInt(unitQuantities.bfLoneQty) || 0,
      parseInt(unitQuantities.bfYwayQty) || 0,
      parseInt(unitQuantities.bfs) || 0,
      parseInt(totalAmount || 0),
      kyat.toString()
    )
      .then(() => {
        toast.success("Buy successful");
        const quantity = formatQuantity();
        const bfQuantity=bfFormatQuantity();
        _handlePrintService(
          selectedCustomer.customerName,
          bfQuantity,
          quantity,
          unitPrice + " ကျပ်",
          totalAmount + " ကျပ်"
        );
      })
      .catch((error) => {
        toast.error("Error during buy");
      })
      .finally(() => {
        setLoading(false);
      });
    fetchBuyData();
  };
  const handleClear = () => {
    setSelectedCustomer(null);
    setUnitQuantities({
      loneQty: "",
      paeQty: "",
      ywayQty: "",
      siQty: "",
      bfLoneQty: "",
      bfYwayQty: "",
      bfSiQty: "",
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
        <Grid container spacing={2}>
          <Typography variant="h6" align="left" fontWeight="bold" mt={1} ml={2}>
            Buy Gold
          </Typography>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={unitType}
                onChange={(e) => handleRadio(e.target.value)}
              >
                <FormControlLabel
                  value="LS"
                  control={<Radio />}
                  label="လုံး/စိ"
                />
                <FormControlLabel
                  value="Yway"
                  control={<Radio />}
                  label="ရွေး"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={12}>
            <Typography variant="h6" color="error" fontWeight="bold">
              မီးမစစ်ခင်
            </Typography>
          </Grid>
          {/* Before Fire Quantity */}
          {unitType == "LS" ? (
            <>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Enter BF Lone Qty"
                  fullWidth
                  value={unitQuantities.bfLoneQty}
                  onChange={(e) =>
                    setUnitQuantities({
                      ...unitQuantities,
                      bfLoneQty: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Enter BF Si Qty"
                  fullWidth
                  value={unitQuantities.bfSiQty}
                  onChange={(e) =>
                    setUnitQuantities({
                      ...unitQuantities,
                      bfSiQty: e.target.value,
                    })
                  }
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={3}>
              <TextField
                label="Enter BF Yway Qty"
                fullWidth
                value={unitQuantities.bfYwayQty}
                onChange={(e) =>
                  setUnitQuantities({
                    ...unitQuantities,
                    bfYwayQty: e.target.value,
                  })
                }
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              မီးစစ်ပြီး
            </Typography>
          </Grid>
          {unitType == "LS" ? (
            <>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Enter Lone Qty"
                  type="number"
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
                  label="Enter Si Qty"
                  type="number"
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
            </>
          ) : (
            <Grid item xs={12} sm={3}>
              <TextField
                label="Enter Yway Qty"
                fullWidth
                type="number"
                value={unitQuantities.ywayQty}
                onChange={(e) =>
                  setUnitQuantities({
                    ...unitQuantities,
                    ywayQty: e.target.value,
                  })
                }
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              disabled
              label="Unit Price"
              fullWidth
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Total Amount"
              fullWidth
              value={totalAmount}
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuy}
              disabled={disableBuy} // Disable button when loading
            >
              {loading ? "Buying..." : "Buy"}
            </Button>     
          </Grid>    
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold">
              ဒီနေ့အဝယ်စာရင်း
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <PaperComponent header={"ရွှေအလေးချိန်"} value={totalKyatAmount} />
          </Grid>
          <Grid item xs={3}>
            <PaperComponent header={"စုစုပေါင်းငွေ"} value={totalBuyAmount} />
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
