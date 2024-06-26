// src/api/UpdateGoldPriceAPI.js

import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';

const UpdateGoldPriceAPI = async (priceID, lonePrice, ywayPrice) => {
  console.log("Yway Price",ywayPrice);
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

    const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}price`, {
      priceID,      
      lonePrice,
      ywayPrice
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

export default UpdateGoldPriceAPI;
