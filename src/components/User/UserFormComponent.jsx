import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BackDropComponent from "../Loading/BackDropComponent";
import CreateUserAPI from "../../api/user/CreateUserController";
import GetUserAPI from "../../api/user/GerUserController";
import DeleteUserAPI from "../../api/user/DeleteUserController";
import UpdateUserAPI from "../../api/user/UpdateUserController";
const UserFormComponent = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(""); // New state for password
  const [userRole, setUserRole] = useState(""); // New state for user role
  const [selectedShop, setSelectedShop] = useState(""); // New state for user role
  const [roles, setRoles] = useState(["Admin", "Staff"]); // Options for Autocomplete
  const [shops, setShops] = useState(["Kaung1", "Kaung2"]); // Options for Autocomplete
  const [users, setUsers] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  // Edit Modal State
  const [editUserId, setEditUserId] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const [editShopName, setEditShopName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    // Fetch users from the server
    setShowBackDrop(true);
    GetUserAPI(setUsers,setShowBackDrop);
  }, []); // Empty dependency array ensures the effect runs only once

  const handleAddUser = () => {
    // Make a POST request to add a new user
    const currentDate = new Date().toISOString();  
    const postBody = {
      userName:userName,
      password:password,
      userRole:userRole,
      createDate:currentDate,
      businessName:selectedShop
    }
    CreateUserAPI(postBody,setUsers,setShowBackDrop,setUserName,setPassword,setUserRole,toast) 
  };
  const handleEditModalOpen = (userID, userName, password, userRole,businessName) => {
    setEditUserId(userID);
    setEditUserName(userName);
    setEditPassword(password);
    setEditUserRole(userRole);
    setEditModalOpen(true);
    setEditShopName(businessName)
    
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    // Make a PUT request to update the user
    const postBody = {
      id:editUserId,
      UserName:editUserName,
      UserRole:editUserRole,
      Password:editPassword,
      businessName:editShopName
    }
    UpdateUserAPI(postBody,setUsers,setShowBackDrop,toast);
    handleEditModalClose();
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setShowBackDrop(true);
      const postBody = {
        id:userId.toString()
      }
      // Make a DELETE request to remove the user
      DeleteUserAPI(postBody,setUsers,users,setShowBackDrop,toast);
    }
  };

  const columns = [
    {
      name:"Id",
      label:"ID",
      options:{
        display:"none"
      }
    },
    {
      name: "UserName",
      label: "Name",
    },
    {
      name: "Password",
      label: "Password",
    },
    {
      name: "UserRole",
      label: "Role",
    },
    {
      name: "BusinessName",
      label: "Shop",
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditModalOpen(...tableMeta.rowData)}
          >
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(tableMeta.rowData[0])}
          >
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
    <div style={{ flexDirection: "column", display: "flex" }}>
      <Typography variant="h6">Add New User</Typography>
      <TextField
        label="User Name"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" } }}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password" // New text input for password
        type="password"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Autocomplete
        id="user-role-autocomplete"
        options={roles}
        getOptionLabel={(option) => option}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={userRole}
        onChange={(event, newValue) => setUserRole(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="User Role"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Autocomplete
        id="shop-autocomplete"
        options={shops}
        getOptionLabel={(option) => option}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={selectedShop}
        onChange={(event, newValue) => setSelectedShop(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Shop"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
      >
        Add User
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Users
      </Typography>
      {users.length > 0 ? (
        <MUIDataTable data={users} columns={columns} options={options} />
      ) : (
        <Typography>No users available.</Typography>
      )}
      {showBackDrop ? <BackDropComponent /> : <></>}
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
  <TextField
    label="User Name"
    variant="outlined"
    fullWidth
    value={editUserName}
    onChange={(e) => setEditUserName(e.target.value)}
    margin="normal"
  />
  <TextField
    label="Password"
    type="password"
    variant="outlined"
    fullWidth
    value={editPassword}
    onChange={(e) => setEditPassword(e.target.value)}
    margin="normal"
  />
  <Autocomplete
  id="edit-user-role-autocomplete"
  options={roles}
  getOptionLabel={(option) => option}
  fullWidth
  value={editUserRole}
  onChange={(event, newValue) => setEditUserRole(newValue)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="User Role"
      variant="outlined"
      margin="normal"
    />
  )}
/>
<Autocomplete
        id="shop-autocomplete"
        options={shops}
        getOptionLabel={(option) => option}
        fullWidth
        value={editShopName}
        onChange={(event, newValue) => setEditShopName(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Shop"
            variant="outlined"
            margin="normal"
          />
        )}
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

export default UserFormComponent;
