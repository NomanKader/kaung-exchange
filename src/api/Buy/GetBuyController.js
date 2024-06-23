// src/service/buy/GetBuyService.js
import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';
import dayjs from 'dayjs';

const GetBuyAPI = async (fromDate, toDate,customerName) => {
  try {
    // Retrieve the encrypted token from sessionStorage
    const encryptedToken = sessionStorage.getItem('token');
    const token = _handleDecryptTokenService(encryptedToken);

    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}buy`, {
      params: {
        fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
        toDate: dayjs(toDate).format('YYYY-MM-DD'),
        customerName:customerName
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
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
      throw new Error('An error occurred while fetching buy data. Please try again.');
    }
  }
};

export default GetBuyAPI;
