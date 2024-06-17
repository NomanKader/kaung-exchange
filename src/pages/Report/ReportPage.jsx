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

const ReportPage = ({ history }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Fetch customer list
    axios.get('/api/customer-list')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        toast.error("Failed to fetch customers");
      });
  }, []);

  const handleFilter = () => {
    if (!fromDate) {
      toast.error("Please choose a From Date first.");
      return;
    }

    if (toDate && dayjs(toDate).isBefore(dayjs(fromDate))) {
      toast.error("To Date cannot be earlier than From Date.");
      return;
    }

    // Simulate API call
    axios.post('/api/report', { fromDate, toDate, customer })
      .then(response => {
        setReportData(response.data);
        toast.success("Report fetched");
      })
      .catch(error => {
        toast.error("Failed to fetch report");
      });
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
    setCustomer(null);
    setReportData([]);
    window.location.reload(); // Refresh the page
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
              options={customers}
              getOptionLabel={(option) => option.name}
              value={customer}
              onChange={(event, newValue) => setCustomer(newValue)}
              renderInput={(params) => <TextField {...params} label="Customer Name" fullWidth />}
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
                <TableCell>Unit</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Kyat Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.customerName}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>{data.unitPrice}</TableCell>
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
