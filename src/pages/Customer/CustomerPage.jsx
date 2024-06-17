import React, { useState } from "react";
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
  Paper
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import theme from "../../theme";
import DrawerComponent from "../../components/Drawer/DrawerComponent";

const CustomerPage = ({history}) => {
  const [customerName, setCustomerName] = useState("");
  const [customers, setCustomers] = useState([]);

  const handleCreate = () => {
    // Simulate API call
    axios.post('/api/create-customer', { name: customerName })
      .then(response => {
        setCustomers([...customers, { name: customerName }]);
        toast.success("Customer created");
      })
      .catch(error => {
        toast.error("Failed to create customer");
      });
  };

  const handleClear = () => {
    setCustomerName("");
  };

  const handleEdit = (index) => {
    // Simulate API call
    axios.put(`/api/edit-customer/${index}`, { name: customerName })
      .then(response => {
        const updatedCustomers = [...customers];
        updatedCustomers[index].name = customerName;
        setCustomers(updatedCustomers);
        toast.success("Customer updated");
      })
      .catch(error => {
        toast.error("Failed to update customer");
      });
  };

  const handleDelete = (index) => {
    // Simulate API call
    axios.delete(`/api/delete-customer/${index}`)
      .then(response => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
        toast.success("Customer deleted");
      })
      .catch(error => {
        toast.error("Failed to delete customer");
      });
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
                <TableCell>Customer Name</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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

export default CustomerPage;
