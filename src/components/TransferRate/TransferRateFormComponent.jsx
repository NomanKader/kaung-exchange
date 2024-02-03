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
import { ToastContainer, toast } from "react-toastify";
import BackDropComponent from "../Loading/BackDropComponent";
import GetTransferRateAPI from "../../api/transferrate/GetTransferRateController";
import CreateTransferRateAPI from "../../api/transferrate/CreateTransferRateController";
import UpdateTransferRateAPI from "../../api/transferrate/UpdateTransferRateController";
const TransferRateFormComponent = () => {
  const [cashInPercentage, setCashInPercentage] = useState("");
  const [cashOutPercentage, setCashOutPercentage] = useState(""); // New state for cashOutPercentage
  const [mobileMoney, setMoblileMoney] = useState(""); // New state for user role
  const [mobileMoneyList, setMobileMoneyList] = useState(["Wave Money", "Kpay","CB Pay","Mytel Pay","True Money"]); // Options for Autocomplete
  const [transferList, setTransferList] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  // Edit Modal State
  const [editTransferRateId, setEditTransferRateId] = useState("");
  const [editCashInPercentage, setEditCashInPercentage] = useState("");
  const [editCashOutPercentage, setEditCashOutPercentage] = useState("");
  const [editMobileMoney, setEditMobileMoney] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    // Fetch transferList from the server
    setShowBackDrop(true);
    GetTransferRateAPI(setTransferList,setShowBackDrop);
  }, []); // Empty dependency array ensures the effect runs only once

  const handleAddTransferRate = () => {
    // Make a POST request to add a new user
    const postBody = {
      wallet:mobileMoney,
      cashIn_Percentage:cashInPercentage,
      cashOut_Percentage:cashOutPercentage      
    }
    CreateTransferRateAPI(postBody,setTransferList,setShowBackDrop,setMoblileMoney,setCashInPercentage,setCashOutPercentage,toast) 
  };
  const handleEditModalOpen = (transferRateId,mobileMoney,cashInPercentage, cashOutPercentage) => {
    console.log("edit transfer rate id",transferRateId);
    console.log("edit transfer rate id",mobileMoney);
    console.log("edit transfer rate id",cashInPercentage);
    console.log("edit transfer rate id",cashOutPercentage);
    setEditTransferRateId(transferRateId);
    setEditCashInPercentage(cashInPercentage);
    setEditCashOutPercentage(cashOutPercentage);
    setEditMobileMoney(mobileMoney);
    setEditModalOpen(true);
    
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    // Make a PUT request to update the user
    const postBody = {
      id:editTransferRateId,
      wallet:editMobileMoney,
      cashIn_Percentage:editCashInPercentage,
      cashOut_Percentage:editCashOutPercentage
    }
    UpdateTransferRateAPI(postBody,setTransferList,setShowBackDrop,toast);
    handleEditModalClose();
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
      name: "Wallet",
      label: "Mobile Money",
    },
    {
      name: "CashIn_Percentage",
      label: "CashIn %",
    },
    {
      name: "CashOut_Percentage",
      label: "CashOut %",
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
    }
  ];

  const options = {
    selectableRows: "none",
  };

  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <Typography variant="h6">Add Transfer Rate</Typography>
      <Autocomplete
        id="user-role-autocomplete"
        options={mobileMoneyList}
        getOptionLabel={(option) => option}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={mobileMoney}
        onChange={(event, newValue) => setMoblileMoney(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Mobile Money"
            variant="outlined"
            margin="normal"
          />
        )}
      />
    <TextField
        type="number"
        label="Cash In Percentage"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" } }}
        value={cashInPercentage}
        onChange={(e) => setCashInPercentage(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Cash Out Percentage" // New text input for cashOutPercentage
        type="number"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={cashOutPercentage}
        onChange={(e) => setCashOutPercentage(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTransferRate}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
      >
        Add Transfer Rate
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Transfer Rates
      </Typography>
      {transferList.length > 0 ? (
        <MUIDataTable data={transferList} columns={columns} options={options} />
      ) : (
        <Typography>No transfer rates available.</Typography>
      )}
      {showBackDrop ? <BackDropComponent /> : <></>}
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Transfer Rates</DialogTitle>
        <DialogContent>
        <Autocomplete
        id="user-role-autocomplete"
        options={mobileMoneyList}
        getOptionLabel={(option) => option}
        fullWidth
        value={editMobileMoney}
        onChange={(event, newValue) => setEditMobileMoney(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Mobile Money"
            variant="outlined"
            margin="normal"
          />
        )}
      />
  <TextField
    type="text"
    label="Cash In Percentage"
    variant="outlined"
    fullWidth
    value={editCashInPercentage}
    onChange={(e) => setEditCashInPercentage(e.target.value)}
    margin="normal"
  />
      <TextField
        label="Cash Out Percentage" // New text input for cashOutPercentage
        type="text"
        variant="outlined"
        fullWidth
        value={editCashOutPercentage}
        onChange={(e) => setEditCashOutPercentage(e.target.value)}
        margin="normal"
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

export default TransferRateFormComponent;
