// src/service/customer/GetCustomerService.js
import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';


const GetCustomerAPI = async () => {
  try {
    // Retrieve the encrypted token from sessionStorage
    const encryptedToken = sessionStorage.getItem('token');
    const token=_handleDecryptTokenService(encryptedToken);

    const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'customer', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.message === 'No token found') {
      alert('You are not authorized.');
      window.location.href = '/'; // Redirect to home page or login page
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.');
    } else {
      throw new Error('An error occurred while fetching customer data. Please try again.');
    }
  }
};

export default GetCustomerAPI;
