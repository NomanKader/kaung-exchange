import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import theme from "../../theme";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import BackDropComponent from "../../components/Loading/BackDropComponent";
import GetCustomerAPI from "../../api/Customer/GetCustomerController";
import CreateCustomerAPI from "../../api/Customer/CreateCustomerController"; // Import CreateCustomerAPI
import UpdateCustomerAPI from "../../api/Customer/UpdateCustomerController";

const CustomerPage = ({ history }) => {
  const [customerName, setCustomerName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCustomerName, setEditCustomerName] = useState("");
  const [editCustomerIndex, setEditCustomerIndex] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false); // State for update loading

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const customerData = await GetCustomerAPI();
      setCustomers(customerData);
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await CreateCustomerAPI(customerName); // Use CreateCustomerAPI to create customer
      toast.success("Customer created");
      await fetchCustomers();
    } catch (error) {
      toast.error("Failed to create customer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCustomerName("");
  };

  const handleEditOpen = (id,name) => {
    setEditCustomerName(name);
    setEditCustomerIndex(id);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setOpenDialog(false);
    setEditCustomerName("");
    setEditCustomerIndex(null);
  };

  const handleUpdate = async () => {
    setUpdateLoading(true); // Set loading to true when update starts
    try {
      // Simulate API call
      await UpdateCustomerAPI(editCustomerIndex,editCustomerName,setOpenDialog,setUpdateLoading,toast,setCustomers);      
    } catch (error) {
      toast.error("Failed to update customer");
    } finally {
      setUpdateLoading(false); // Set loading to false after API call completes
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerComponent history={history}/>
      <Box mt={3} ml={4} mr={3}>
        <Typography variant="h5" gutterBottom>
          Manage Customers
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid mt={3} item xs={12} sm={8}>
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid mt={3} item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreate}
            >
              Create
            </Button>
          </Grid>
          <Grid mt={3} item xs={12} sm={2}>
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

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                <TableCell>{customer.customerID}</TableCell>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEditOpen(customer.customerID,customer.customerName)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {isLoading && <BackDropComponent />} {/* Show backdrop while loading */}
      <ToastContainer />

      {/* Edit Customer Dialog */}
      <Dialog open={openDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Customer Name"
            type="text"
            fullWidth
            value={editCustomerName}
            onChange={(e) => setEditCustomerName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" disabled={updateLoading}>
            {updateLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CustomerPage;
