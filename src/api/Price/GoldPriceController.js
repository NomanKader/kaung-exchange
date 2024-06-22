import axios from 'axios';
import _handleDecryptTokenService from '../../service/crypto/DecryptTokenService';

const GoldPriceAPI = async () => {
  try {
    // Retrieve the encrypted token from sessionStorage
    const encryptedToken = sessionStorage.getItem('token');
    const token=_handleDecryptTokenService(encryptedToken);

    // Make API call with decrypted token
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}price`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data; // Assuming the API returns some data upon success
  } catch (error) {
    throw error; // Throw error to handle in components
  }
};

export default GoldPriceAPI;
