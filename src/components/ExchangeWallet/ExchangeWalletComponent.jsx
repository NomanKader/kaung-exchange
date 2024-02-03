import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Paper,
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from "react-toastify";
import BackDropComponent from "../Loading/BackDropComponent";
import GetExchangeWalletAPI from '../../api/exchangewallet/GetExchangeWalletController';
import CreateExchangeWalletAPI from "../../api/exchangewallet/CreateExchangeWalletController";
import UpdateTransferRateAPI from "../../api/transferrate/UpdateTransferRateController";
import { Add, FilterAlt, List } from "@mui/icons-material";
import dayjs from "dayjs";
import moment from "moment";

const ExchangeWalletComponent = () => {
  const [cashInPercentage, setCashInPercentage] = useState("");
  const [cashOutPercentage, setCashOutPercentage] = useState(""); // New state for cashOutPercentage
  const [mobileMoney, setMoblileMoney] = useState(""); // New state for user role
  const [selectedShop, setSelectedShop] = useState(""); // New state for user role
  const [mobileMoneyList, setMobileMoneyList] = useState([
    "Wave Money",
    "Kpay",
    "CB Pay",
    "Mytel Pay",
    "True Money",
  ]); // Options for Autocomplete
  const [shops, setShops] = useState(["Kaung1", "Kaung2"]); // Options for Autocomplete
  const [transferList, setTransferList] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [fromWalletAccountNumber, setFromWalletAccountNumber] = useState("");
  const [toWalletAccountNumber, setToWalletAccountNumber] = useState("");
  const [selectedFromWallet, setSelectedFromWallet] = useState("");
  const [selectedToWallet, setSelectedToWallet] = useState("");
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [exchangeNotes, setExchangeNotes] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [helperText, setHelperText] = useState("Please fill required field");
  const [exchangeWalletList,setExchangeWalletList]=useState([]);
  const [fromDate,setFromDate]=useState("");
  const [toDate,setToDate]=useState("");
  // Edit Modal State
  const [editTransferRateId, setEditTransferRateId] = useState("");
  const [editCashInPercentage, setEditCashInPercentage] = useState("");
  const [editCashOutPercentage, setEditCashOutPercentage] = useState("");
  const [editMobileMoney, setEditMobileMoney] = useState("");
  const [editShopName, setEditShopName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    // Fetch transferList from the server
    setShowBackDrop(true);
    const todayDate=moment().format("YYYY-MM-DD");
    GetExchangeWalletAPI(setExchangeWalletList,setShowBackDrop,toast,todayDate,todayDate);
    setFromDate(dayjs());
    setToDate(dayjs());
  }, []); // Empty dependency array ensures the effect runs only once

  const handleFilter=()=>{
    const formatFromDate=moment(fromDate).format("YYYY-MM-DD");
    const formatToDate=moment(toDate).format("YYYY-MM-DD");
    console.log("From Date",formatFromDate);
    console.log("To Date",formatToDate);
    GetExchangeWalletAPI(setExchangeWalletList,setShowBackDrop,toast,formatFromDate,formatToDate);
  }
  const handleGetAllData=()=>{
    GetExchangeWalletAPI(setExchangeWalletList,setShowBackDrop,toast,null,null);
  }
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    // Make a PUT request to update the user
    const postBody = {
      id: editTransferRateId,
      wallet: editMobileMoney,
      cashIn_Percentage: editCashInPercentage,
      cashOut_Percentage: editCashOutPercentage,
    };
    UpdateTransferRateAPI(postBody, setTransferList, setShowBackDrop, toast);
    handleEditModalClose();
  };
  const handleSubmit = () => {
    const isEmpty = (value) => value.trim() === '';
  
    if ([selectedFromWallet, selectedToWallet, fromWalletAccountNumber, toWalletAccountNumber, exchangeAmount, exchangeNotes].some(isEmpty)) {
      toast.warn("Please fill all fields");
    } else {
      const postBody={        
        "fromWallet": selectedFromWallet,
        "toWallet": selectedToWallet,
        "fromAccount": fromWalletAccountNumber,
        "toAccount": toWalletAccountNumber,
        "exchangeAmount": exchangeAmount,  
        "note": exchangeNotes        
      }
      CreateExchangeWalletAPI(postBody,setShowBackDrop,toast,setExchangeWalletList);
      setOpenCreateDialog(false);
      resetForm();  // Assuming you have a resetForm function to reset the form state
    }
  };
  
  // Assuming you have a function to reset the form state
  const resetForm = () => {
    setSelectedFromWallet("");
    setSelectedToWallet("");
    setFromWalletAccountNumber("");
    setToWalletAccountNumber("");
    setExchangeAmount("");
    setExchangeNotes("");
  };
  
  
  const columns = [
    {
      name: "Id",
      label: "ID",
      options: {
        display: "none",
      },
    },
    {
      name: "FromWallet",
      label: "From Wallet",
    },
    {
      name: "ToWallet",
      label: "To Wallet",
    },
    {
      name: "FromAccount",
      label: "From Account",
    },
    {
      name:"ToAccount",
      label:"To Account"
    },
    {
      name:'ExchangeAmount',
      label:'Exchange Amount'
    },
    {
      name:"Note"      
    },
    {
      name:'ExchangeDate',     
    },
  ];

  const options = {
    selectableRows: "none",
  };

  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <Button
        variant="contained"
        sx={{ width: 300 }}
        onClick={() => setOpenCreateDialog(true)}
        startIcon={<Add/>}
      >
        Add Exchange Currency
      </Button>
    {/* Date Filter */}
    <Paper elevation={0} sx={{display:'flex',flex:1,flexDirection:{lg:'row',xs:'column'},backgroundColor:'#f5f5f5',mt:3}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="From Date" value={fromDate} onChange={(value)=>setFromDate(dayjs(value).toDate())} />
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={(value) => setToDate(dayjs(value).toDate())}
        />
      </DemoContainer>
    </LocalizationProvider>
    <Button variant="contained" sx={{width:{lg:200,xs:300},height:50,mt:1.3,ml:{lg:3,xs:0}}} onClick={()=>handleFilter()} startIcon={<FilterAlt/>}>Filter</Button>
    <Button variant="contained" color="secondary" sx={{width:{lg:200,xs:300},height:50,mt:1.3,ml:{lg:3,xs:0}}} onClick={()=>handleGetAllData()} startIcon={<List/>}>Get All Data</Button>
    </Paper>    
      {/* Create Open Dialog */}
      <Dialog
        open={openCreateDialog}       
        hideBackdrop={false}
        onBackdropClick={false}
      >
        <DialogTitle>Add Exchange Currency</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="from-wallet-autocomplete"
            fullWidth
            options={mobileMoneyList}
            getOptionLabel={(option) => option}
            value={selectedFromWallet}
            onChange={(event, newValue) => setSelectedFromWallet(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From Wallet"
                variant="outlined"
                margin="normal"
                required
              />
            )}
          />
          <TextField
            type="number"
            label="Enter Account Number"
            fullWidth
            required
            variant="outlined"
            value={fromWalletAccountNumber}
            onChange={(e) => setFromWalletAccountNumber(e.target.value)}
            margin="normal"
          />
          <Autocomplete
            id="to-wallet-autocomplete"
            options={mobileMoneyList}
            getOptionLabel={(option) => option}
            fullWidth
            value={selectedToWallet}
            onChange={(event, newValue) => setSelectedToWallet(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To Wallet"
                variant="outlined"
                margin="normal"
                required
              />
            )}
          />
          <TextField
            label="Enter Account Number"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={toWalletAccountNumber}
            onChange={(e) => setToWalletAccountNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Enter Amount"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={exchangeAmount}
            onChange={(e) => setExchangeAmount(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Enter Notes"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={exchangeNotes}
            onChange={(e) => setExchangeNotes(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {exchangeWalletList.length > 0 ? (
        <div style={{marginTop:'3%'}}>
        <MUIDataTable title="Exchange History" data={exchangeWalletList} columns={columns} options={options} />
        </div>
      ) : (
        <Typography>No Exchange History available.</Typography>
      )}
      {showBackDrop ? <BackDropComponent /> : <></>}
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Exchange History</DialogTitle>
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
      <ToastContainer />
    </div>
  );
};

export default ExchangeWalletComponent;
