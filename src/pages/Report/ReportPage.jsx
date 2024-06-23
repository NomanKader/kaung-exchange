import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import theme from "../../theme";
import dayjs from 'dayjs';
import GetBuyAPI from "../../api/Buy/GetBuyController";
import GetCustomerAPI from "../../api/Customer/GetCustomerController";

const ReportPage = ({ history }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Fetch selectedCustomer list
   const getCustomerList=async()=>{
    const data=await GetCustomerAPI();
    setCustomers(data);
   }
   getCustomerList();
  }, []);

  const handleFilter = async () => {
    if (!fromDate) {
      toast.error("Please choose a From Date first.");
      return;
    }
  
    if (toDate && dayjs(toDate).isBefore(dayjs(fromDate))) {
      toast.error("To Date cannot be earlier than From Date.");
      return;
    }
  
    try {
      console.log("Customer",selectedCustomer);
      const response = await GetBuyAPI(fromDate, toDate,selectedCustomer);      
      setReportData([]);
      setReportData(response);
      toast.success("Report fetched");
    } catch (error) {
      toast.error("Failed to fetch report");
    }
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
    setSelectedCustomer(null);
    setReportData([]);
    window.location.reload(); // Refresh the page
  };
  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);    
  };
  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history} />
      <Box mt={3} ml={4} mr={3}>
        <Typography variant="h4" gutterBottom>
          Report
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
          <Autocomplete
              value={selectedCustomer}
              onChange={handleCustomerChange}
              options={customers}
              getOptionLabel={(option) => option.customerName}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" fullWidth />
              )}
            />
        </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFilter}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClear}
              startIcon={<ClearIcon />}
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Yway Qty</TableCell>
                <TableCell>Lone Qty</TableCell>
                <TableCell>Pae Qty</TableCell>
                <TableCell>Si Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Kyat Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.customerName}</TableCell>
                  <TableCell>{data.ywayQuantity}</TableCell>
                  <TableCell>{data.loneQuantity}</TableCell>
                  <TableCell>{data.paeQuantity}</TableCell>
                  <TableCell>{data.siQuantity}</TableCell>
                  <TableCell>{data.loneUnitPrice}</TableCell>
                  <TableCell>{data.totalAmount}</TableCell>
                  <TableCell>{data.kyatAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default ReportPage;
