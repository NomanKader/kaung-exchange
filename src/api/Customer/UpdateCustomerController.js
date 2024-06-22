import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';

const UpdateCustomerAPI = async (customerID, customerName) => {
    console.log("Customer ID",customerID);
    console.log("Customer Name",customerName);
  try {
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

    return response.data; // Assuming the API returns some data upon success
  } catch (error) {
    throw error; // Throw error to handle in components
  }
};

export default UpdateCustomerAPI;
