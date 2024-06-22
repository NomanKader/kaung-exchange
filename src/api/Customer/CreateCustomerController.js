import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';
const CreateCustomerAPI = async (customerName) => {
  try {
    // Retrieve the encrypted token from sessionStorage
    const encryptedToken = sessionStorage.getItem('token');
    const token=_handleDecryptTokenService(encryptedToken);

    // Make API call to create customer
    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}customer`, {
      customerName: customerName
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

export default CreateCustomerAPI;
