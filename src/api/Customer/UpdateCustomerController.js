import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';
import GetCustomerAPI from './GetCustomerController';

const UpdateCustomerAPI = async (customerID, customerName,setOpenDialog,setUpdateLoading,toast,setCustomers) => {
    console.log("Customer ID",customerID);
    console.log("Customer Name",customerName);
    
  try {
    setUpdateLoading(true);
    const encryptedToken = sessionStorage.getItem('token');
    if (!encryptedToken) {
      window.location.replace('/');
      return;
    }    
    const token = _handleDecryptTokenService(encryptedToken);

    if (!token) {
      window.location.replace('/');
      return;
    }

    const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}customer`, {
      customerID,
      customerName
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.status==200){     
      toast.success("Update Successful"); 
      const data=await GetCustomerAPI();
      setCustomers(data);
    }
    setOpenDialog(false);
  } catch (error) {
    throw error; // Throw error to handle in components
  }
};

export default UpdateCustomerAPI;
