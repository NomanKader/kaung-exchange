import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import './SaleStyle.css';
import { ToastContainer, toast } from "react-toastify";
import BackDropComponent from "../Loading/BackDropComponent";
import LogoIcon from '../../assets/logo.png';
import moment from "moment";
import GetWalletAPI from '../../api/wallet/GetWalletController';
const SaleFormComponent = () => {
  const [walletList,setWalletList]=useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [invoiceTotalAmount,setInvoiceTotalAmount]=useState(0);
  //   const [totalPrice,setTotalPrice]=useState('');

  useEffect(()=>{
    console.log("Getting Wallet List...");
    GetWalletAPI(setWalletList,setShowBackDrop,toast)
  },[])
  useEffect(()=>{
    if(walletList.length>0){
        walletList.map(({StaffName,WalletType})=>{
          if(StaffName=='staff'){
            setWalletList([]);
           setWalletList([{label:WalletType}])
          }
        })
    }
  },[walletList]);
  const handleGetSale=()=>{

  }
  const handleAddSale = async () => {
    const currentDate = moment().format('YYYY-MM-DD');
    // Check if both product and quantity are selected
    if (!product || !quantity) {
      toast.warn("Please select a product and enter a quantity");
      return;
    }

    // Make a POST request to add a new sale
    await axios
      .post("http://localhost:5000/api/sale", {
        user_id: 1, // Assuming you have a logged-in user with user_id 1
        product_id: product.Product_ID,
        quantity: quantity,
        create_date:currentDate
      })
      .then((response) => {
        // Update the sales list after successful addition
        handleGetSale(response.data.insertedSaleId);
      })
      .catch((error) => {
        console.error("Error adding sale:", error.response.data.message);
        if (error.response.status === 409) {
          toast.warn("Sale Already Exists");
        } else if(error.response.status==400) {
            toast.warn("Invalid Quantity");
        
        }
        else{
          toast.error("Server Is Busy");
        }
      });
  };

  const handlePrintInvoice = async () => {
    if (invoiceDetails) {
            // Use reduce to sum up all total_price values
            const total = invoiceDetails.reduce((accumulator, item) => accumulator + parseFloat(item.total_price), 0);
            setInvoiceTotalAmount(total);
            setOpenModal(true);
      } 
     else {      
        toast.warn('No Sale Detail Available to Print');
    }
  };

  const handleDelete = (saleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sale?"
    );

    if (confirmDelete) {
      setShowBackDrop(true);
      // Make a DELETE request to remove the sale
      axios
        .delete(`http://localhost:5000/api/sale/${saleId}`)
        .then(() => {
          handleGetSale();
          setShowBackDrop(false);
        })
        .catch((error) => {
          if (error.response.status === 409) {
            toast.warn("Sale Already Exists");
          } else {
            toast.error("Server Is Busy");
          }
          console.error("Error deleting sale:", error);
        });
    }
  };

  const columns = [
    {
      name: "sale_id",
      label: "ID",
    },
    {
      name: "product_name",
      label: "Product",
    },
    {
      name: "category_name",
      label: "Category",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "total_price",
      label: "Total Price",
    },
    // {
    //   name: "delete",
    //   label: "Delete",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <Button
    //         variant="outlined"
    //         color="secondary"
    //         onClick={() => handleDelete(tableMeta.rowData[0])}
    //       >
    //         Delete
    //       </Button>
    //     ),
    //   },
    // },
  ];

  const options = {
    selectableRows: "none",
  };

  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <Typography variant="h6">Add New Sale</Typography>
      <Autocomplete
        id="product-autocomplete"
        options={walletList}
        getOptionLabel={(option) => option.Product_Name}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={product}
        onChange={(event, newValue) => setProduct(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Product"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <TextField
        label="Quantity"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSale}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
      >
        Add Sale
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handlePrintInvoice}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
      >
        Print
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Sales
      </Typography>
      {sales.length > 0 ? (
        <MUIDataTable data={invoiceDetails} columns={columns} options={options} />
      ) : (
        <Typography>No sales available.</Typography>
      )}

      {showBackDrop ? <BackDropComponent /> : <></>}
      {/* Modal for Invoice */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={LogoIcon}
              alt="Logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <Typography variant="h6">Hnin Convenience Store</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          {invoiceDetails && (
            <>             
              {/* <Typography variant="body1">
                Total Price: {invoiceDetails.totalPrice}
              </Typography> */}

              {/* Today's Date */}
              <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
                Date: {new Date().toLocaleDateString()}
              </Typography>

              {/* Product Table */}
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Product Name
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through sale details and display rows */}
                  {invoiceDetails.map((product) => (                    
                    <tr key={product.product_id}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {product.product_name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {product.quantity}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {product.total_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Amount Calculating */}
              <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
                Total Amount: {parseInt(invoiceTotalAmount || 0).toLocaleString()+' MMK'}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button className="no-print" onClick={() => setOpenModal(false)} color="primary">
            Close
          </Button>
          <Button className="no-print" onClick={() => [window.print(),window.location.reload()]} color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default SaleFormComponent;
