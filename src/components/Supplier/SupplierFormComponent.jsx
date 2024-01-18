import React, { useState, useEffect } from "react";
import {  Typography, TextField, Button,Dialog,DialogContent,DialogActions,DialogTitle } from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackDropComponent from "../Loading/BackDropComponent";

const SupplierFormComponent = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showBackDrop,setShowBackDrop]=useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  useEffect(() => {
    // Fetch categories from the server
    axios.get("http://localhost:5000/api/category")
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  const handleAddCategory = () => {
    // Make a POST request to add a new category
    axios.post("http://localhost:5000/api/category", {
      category_name: categoryName,
    })
      .then(response => {
       
        // Update the categories list after successful addition
        setCategories([{
          "Category_ID": response.data.insertedCategoryId,
          "Category_Name": categoryName
        }, ...categories]);        
        setCategoryName(""); // Clear the input field after adding
        toast.success("Category Added Successfully");  
      })
      .catch(error => {
        console.error("Error adding category:", error.response.data.message);
        console.log(error.response);
        if(error.response.status==409){
          toast.warn("Category Already Exist");
        }
        else{
          toast.error("Server is Busy");
        }
      });
  };
  const handleEdit = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCategoryName(""); // Clear any previous input
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  
  const handleConfirmEdit = () => {
    setOpenEditModal(false);

    // Make a PUT request to update the category
    axios
      .put(`http://localhost:5000/api/category/${selectedCategoryId}`, {
        category_name: categoryName,
      })
      .then((response) => {
        console.log("Category updated successfully:", response.data);

        // Update the categories list after successful update
        const updatedCategories = categories.map((category) => {
          if (category.Category_ID === selectedCategoryId) {
            return { ...category, Category_Name: categoryName };
          }
          return category;
        });

        setCategories(updatedCategories);
        toast.success("Category Updated Successfully");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.warn("Category Already Exist");
        } else {
          toast.error("Server is Busy");
        }
        console.error("Error updating category:", error);
      });
  };
  const handleDelete = (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");

    if (confirmDelete) {
      setShowBackDrop(true);
      // Make a DELETE request to remove the category
      axios.delete(`http://localhost:5000/api/category/${categoryId}`)
        .then(response => {
          
          console.log("Category deleted successfully:", response.data);

          // Update the categories list after successful deletion
          const updatedCategories = categories.filter(category => category.Category_ID !== categoryId);
          setCategories(updatedCategories);
          setShowBackDrop(false);
          toast.success("Category Deleted Successfully");
        })
        .catch(error => {
          if(error.response.status==409){
            toast.warn("Category Already Exist");
          }
          else{
            toast.error("Server is Busy");
          }
          console.error("Error deleting category:", error);
        });
    }
  };

  const columns = [
    {
      name: "Category_ID",
      label: "ID",
    },
    {
      name: "Category_Name",
      label: "Name",
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button variant="outlined" color="primary" onClick={() => handleEdit(tableMeta.rowData[0])}>
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
      <Typography variant="h6">
        Add New Supplier
      </Typography>
      <TextField
        label="Category Name"
        variant="outlined"
        sx={{ width: {lg:'30%',xs:'80%'} }}
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
        sx={{ width: {lg:'30%',xs:'80%'},mt:1 }}
      >
        Add Supplier
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 2,mb:2 }}>
        Suppliers
      </Typography>
      {categories.length > 0 ? (
        <MUIDataTable data={categories} columns={columns} options={options} />
      ) : (
        <Typography>No suppliers available.</Typography>
      )}
      {showBackDrop?
      <BackDropComponent/>:
      <></>
      }     
      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="New Category Name"
            variant="outlined"
            sx={{ width: { lg: "100%", xs: "100%" } }}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default SupplierFormComponent;
