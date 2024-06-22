import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';

const BuyGoldAPI = async (customerId, unit, quantity, unitPrice, totalAmount, kyatAmount) => {
  try {
    // Retrieve the encrypted token from sessionStorage
    const encryptedToken = sessionStorage.getItem('token');
    const token = _handleDecryptTokenService(encryptedToken);

    // Make API call to buy gold
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}buy`, 
      {
        customerId: customerId,
        unit: unit,
        quantity: quantity,
        unitPrice: unitPrice,
        totalAmount: totalAmount,
        kyatAmount: kyatAmount
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data; // Assuming the API returns some data upon success
  } catch (error) {
    throw error; // Throw error to handle in components
  }
};

export default BuyGoldAPI;
