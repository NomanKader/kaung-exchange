import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BackDropComponent from "../Loading/BackDropComponent";

const StockComponent = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editProductId, setEditProductId] = useState("");
  const [editProductName, setEditProductName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  // const [lowestQuantityProduct, setLowestQuantityProduct] = useState(null);

  useEffect(() => {
    //getting categories list
    axios.get("http://localhost:5000/api/category")
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });

    // Fetch products from the server
    axios.get("http://localhost:5000/api/product")
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });

      // axios
      // .get("http://localhost:5000/api/product/lowest-quantity")
      // .then((response) => {
      //   setLowestQuantityProduct(response.data.lowestQuantityProduct);
      // })
      // .catch((error) => {
      //   console.error("Error fetching lowest-quantity product:", error);
      // });
  }, []); // Empty dependency array ensures the effect runs only once
      // Fetch the lowest-quantity product from the server
   

  const handleAddProduct = () => {
    // Make a POST request to add a new product
    axios.post("http://localhost:5000/api/product", {
      product_name: productName,
      product_price: price,
      product_quantity: quantity,
      category_id: categoryId,
    })
      .then(response => {
        // Update the products list after successful addition
        setProducts([{
          "Product_ID": response.data.insertedProductId,
          "Product_Name": productName,
          "Product_Price": price,
          "Product_Quantity": quantity,
          "Category_ID": categoryId,
          "Category_Name": categories.find(cat => cat.Category_ID === categoryId)?.Category_Name || "", // Get the Category_Name  "
        }, ...products]);
        // Clear the input fields after adding
        setProductName("");
        setPrice("");
        setQuantity("");
        setCategoryId("");
        toast.success("Product Added Successfully");
      })
      .catch(error => {
        console.error("Error adding product:", error.response.data.message);
        if (error.response.status === 409) {
         toast.warn("Product Already Exists");  
        } else {
          toast.error("Server is Busy");  
        }
      });
  };

  const handleEditModalOpen = (productId, productName, price, quantity, categoryName,categoryId) => {
    setEditProductId(productId);
    setEditProductName(productName);
    setEditPrice(price);
    setEditQuantity(quantity);
    setEditCategoryId(categoryId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    // Make a PUT request to update the product
    axios
      .put(`http://localhost:5000/api/product/${editProductId}`, {
        product_name: editProductName,
        product_price: editPrice,
        product_quantity: editQuantity,
        category_id: editCategoryId,
      })
      .then(response => {
        console.log("Product updated successfully:", response.data);

        // Update the products list after successful update
        const updatedProducts = products.map(product => {
            if (product.Product_ID === editProductId) {
              return {
                ...product,
                Product_Name: editProductName,
                Product_Price: editPrice,
                Product_Quantity: editQuantity,
                Category_Name: categories.find(cat => cat.Category_ID === editCategoryId)?.Category_Name || "", // Get the Category_Name
                Category_ID: editCategoryId,
              };
            }
            return product;
          });
          

        setProducts(updatedProducts);
        toast.success("Product Updated Successfully");
        handleEditModalClose();
      })
      .catch(error => {
        if (error.response.status === 409) {
          toast.warn("Product Already Exists");
        } else {
          toast.error("Server is Busy");  
        }
        console.error("Error updating product:", error);
      });
  };

  const handleDelete = productId => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setShowBackDrop(true);
      // Make a DELETE request to remove the product
      axios.delete(`http://localhost:5000/api/product/${productId}`)
        .then(response => {
          console.log("Product deleted successfully:", response.data);

          // Update the products list after successful deletion
          const updatedProducts = products.filter(product => product.Product_ID !== productId);
          setProducts(updatedProducts);
          setShowBackDrop(false);
          toast.success("Product Deleted Successfully");
        })
        .catch(error => {
          if (error.response.status === 409) {
            toast.warn("Product Already Exists");
          } else {
            toast.error("Server is Busy");
          }
          console.error("Error deleting product:", error);
        });
    }
  };

  const columns = [
    {
      name: "Product_ID",
      label: "ID",
    },
    {
      name: "Product_Name",
      label: "Name",
    },
    {
      name: "Product_Price",
      label: "Price",
    },
    {
      name: "Product_Quantity",
      label: "Product_Quantity",
    },
    {
      name: "Category_Name",
      label: "Category",
    },
    {
        name: "Category_ID",
        label: "Category_ID",
        options: {
            display:"none"
        }
      },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button variant="outlined" color="primary" onClick={() => handleEditModalOpen(...tableMeta.rowData)}>
            Edit
          </Button>
        ),
      },
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button variant="outlined" color="secondary" onClick={() => handleDelete(tableMeta.rowData[0])}>
            Delete
          </Button>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
  };

  return (
    <div style={{ flexDirection: 'column', display: 'flex' }}>
      <Grid container>
        <Grid container item xs={12} lg={6} direction='column'>
        <Typography variant="h6">
        Add New Product
      </Typography>
      <TextField
        label="Product Name"
        variant="outlined"
        sx={{ width: { lg: '50%', xs: '80%' } }}
        value={productName}
        onChange={e => setProductName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Price"
        variant="outlined"
        sx={{ width: { lg: '50%', xs: '80%' }, mt: 1 }}
        value={price}
        onChange={e => setPrice(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Product_Quantity"
        variant="outlined"
        sx={{ width: { lg: '50%', xs: '80%' }, mt: 1 }}
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        margin="normal"
      />
      <Autocomplete
        options={categories}
        getOptionLabel={option => option.Category_Name}
        sx={{ width: { lg: '50%', xs: '80%' }, mt: 1 }}
        value={categories.find(cat => cat.Category_ID === categoryId) || null}
        onChange={(e, newValue) => setCategoryId(newValue ? newValue.Category_ID : "")}
        renderInput={params => <TextField {...params} label="Select Category" variant="outlined" />}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        sx={{ width: { lg: '50%', xs: '80%' }, mt: 1 }}
      >
        Add Product
      </Button>
        </Grid>
        {/* <Grid item xs={12} lg={6} >
        Lowest-Quantity Product Card
      {lowestQuantityProduct && (
        <Card style={{ marginTop: "16px",marginLeft:0,width:'50%',alignContent:'flex-start'}}>
          <CardContent>
            <Typography variant="h6">Lowest Quantity Product</Typography>
            <Typography variant="h6" color='darkred'>Name: {lowestQuantityProduct.product_name}</Typography>
          </CardContent>
        </Card>
      )}
        </Grid>  */}
      </Grid>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Products
      </Typography>
      {products.length > 0 ? (
        <MUIDataTable data={products} columns={columns} options={options} />
      ) : (
        <Typography>No products available.</Typography>
      )}
      {showBackDrop ? <BackDropComponent /> : <></>}

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={editProductName}
            onChange={e => setEditProductName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={editPrice}
            onChange={e => setEditPrice(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Product Quantity"
            variant="outlined"
            fullWidth
            value={editQuantity}
            onChange={e => setEditQuantity(e.target.value)}
            margin="normal"
          />
<Autocomplete
  options={categories}
  getOptionLabel={option => option.Category_Name}
  fullWidth
  value={categories.find(cat => cat.Category_ID === editCategoryId) || null}
  onChange={(e, newValue) => setEditCategoryId(newValue ? newValue.Category_ID : "")}
  renderInput={params => <TextField {...params} label="Select Category" variant="outlined" />}
/>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default StockComponent;
