import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Autocomplete,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import BackDropComponent from "../Loading/BackDropComponent";
import GetUserAPI from "../../api/user/GerUserController";
import GetWalletAPI from "../../api/wallet/GetWalletController";
import DeleteWalletAPI from "../../api/wallet/DeleteWalletController";
import CreateWalletAPI from "../../api/wallet/CreateWalletController";
import UpdateWalletAPI from "../../api/wallet/UpdateWalletController";
const MobileMoneyFormComponent = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState(null);
  const mobileMoneyList = ["Kpay", "Wave", "CB Pay", "MyTel Pay", "True Money"];
  const [selectedMobileMoney, setSelectedMobileMoney] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [investment, setInvestment] = useState();
  const [userList, setUserList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [walletList, setWalletList] = useState([]);
  const [editStaffId, setEditStaffId] = useState("");
  const [editStaff, setEditStaff] = useState("");
  const [editWalletType,setEditWalletType]=useState("");
  const [editAccountNo,setEditAccountNo]=useState("");
  const [editWalletName,setEditWalletName]=useState("");
  const [editInvestment,setEditInvestment]=useState("");

  //getUserList
  useEffect(() => {
    const getStaffList = async () => {
      await GetUserAPI(setUserList, setShowBackDrop);
    };
    getStaffList();
  }, []);
  //Work to get staff list
  useEffect(() => {
    console.log("userList", userList);
    const newStaffList = userList
      .filter(({ UserRole }) => UserRole === "Staff")
      .map(({ UserName, Id }) => ({ label: UserName, value: Id }));

    setStaffList((prevStaffList) => [...prevStaffList, ...newStaffList]);
  }, [userList]);
  //work to get the list of mobile money list
  useEffect(() => {
    const getMobileMoneyList = async () => {
      await GetWalletAPI(setWalletList, setShowBackDrop, toast);
    };
    getMobileMoneyList();
  }, []);
  const handleAddWallet = () => {
    const staffID = selectedStaff.value;
    const postBody = {
      staff: staffID,
      accountNo: accountNumber,
      walletType: selectedMobileMoney,
      accountUserName: accountName,
      initialAmount: investment,
    };
    CreateWalletAPI(postBody, setWalletList, setShowBackDrop, toast);
  };
  const handleEdit = (walletId,staffId,staff,walletType,accountNo,walletName,investment) => {   
    setSelectedWalletId(walletId);
    setEditStaffId(staffId);
    setEditStaff(staff);
    setSelectedStaff(staff);
    setEditWalletType(walletType);
    setEditAccountNo(accountNo);
    setEditWalletName(walletName);
    setEditInvestment(investment);
    setOpenEditModal(true);

  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleConfirmEdit = () => {
    const postBody={
      id:selectedWalletId,
      staff:editStaffId,
      accountNo:editAccountNo,
      walletType:editWalletType,
      accountUserName:editWalletName,
      initialAmount:editInvestment
    }
    console.log("Post Body",postBody);
    UpdateWalletAPI(postBody,setWalletList,setShowBackDrop,toast)
    setOpenEditModal(false);

  };
  const handleDelete = (walletId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      const postBody = {
        id: selectedWalletId,
      };
      DeleteWalletAPI(postBody, setWalletList, setShowBackDrop, toast);
    }
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
      name: "Staff",
      label: "Staff_ID",
      options:{
        display:"none"
      }
    },
    {
      name: "StaffName",
      label: "Staff",
    },
    {
      name: "WalletType",
      label: "Wallet Type",
    },
    {
      name: "AccountNo",
      label: "AccountNo",
    },
    {
      name: "AccountUserName",
      label: "Wallet Name",
    },
    {
      name: "InitialAmount",
      label: "Investment",
    },
    {
      name: "CreateDate",
      label: "CreateDate",
      options: {
        display: "none",
        customBodyRender: function (value) {
          if (value === null || value === "") {
            return "";
          } else {
            var create_date = moment(value).format("DD-MM-YYYY");
            return create_date;
          }
        },
      },
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(tableMeta.rowData[0],tableMeta.rowData[1],tableMeta.rowData[2],tableMeta.rowData[3],tableMeta.rowData[4],tableMeta.rowData[5],tableMeta.rowData[6])}
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
      <Typography variant="h6">Add Wallet Account</Typography>
      <Autocomplete
        id="mobile-money-account-autocomplete"
        options={mobileMoneyList}
        getOptionLabel={(option) => option}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={selectedMobileMoney}
        onChange={(event, newValue) => setSelectedMobileMoney(newValue)}
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
        label="Enter Account Number" // New text input for password
        type="number"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter Account Name" // New text input for password
        type="text"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter Investment" // New text input for password
        type="number"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={investment}
        onChange={(e) => setInvestment(e.target.value)}
        margin="normal"
      />
      <Autocomplete
        id="staff-autocomplete"
        options={staffList}
        getOptionLabel={(option) => option.label}
        sx={{ width: { lg: "30%", xs: "80%" } }}
        onChange={(event, newValue) => setSelectedStaff(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Staff"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddWallet}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
      >
        Add Wallet Account
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Wallet Account
      </Typography>
      {walletList.length > 0 ? (
        <MUIDataTable data={walletList} columns={columns} options={options} />
      ) : (
        <Typography sx={{ mt: 3 }}>
          No mobile money accounts are currently added. Please add a mobile
          money account to view its details and make changes to it. You can also
          add a new mobile money account by clicking the "Add Wallet Account"
          button above. The mobile money accounts will be displayed here once
          you add them.
        </Typography>
      )}
      {showBackDrop ? <BackDropComponent /> : <></>}
      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Wallet Account</DialogTitle>
        <DialogContent style={{ flexDirection: "column" }}>
          <Autocomplete
            id="mobile-money-account-autocomplete"
            options={mobileMoneyList}
            getOptionLabel={(option) => option}
            fullWidth
            value={editWalletType}
            onChange={(event, newValue) => setEditWalletType(newValue)}         
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
            label="Enter Account Number"
            type="number"
            fullWidth
            variant="outlined"
            value={editAccountNo}
            onChange={(e) => setEditAccountNo(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Enter Account Name"
            type="text"
            variant="outlined"
            fullWidth
            value={editWalletName}
            onChange={(e) => setEditWalletName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Enter Investment"
            type="number"
            variant="outlined"
            fullWidth
            value={editInvestment}
            onChange={(e) => setEditInvestment(e.target.value)}
            margin="normal"
          />
          <Autocomplete
            id="staff-autocomplete"
            options={staffList}
            fullWidth
            value={editStaff}
            onChange={(event, newValue) => [setEditStaff(newValue),setEditStaffId(newValue.value)]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Staff"
                variant="outlined"
                margin="normal"
              />
            )}
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

export default MobileMoneyFormComponent;
