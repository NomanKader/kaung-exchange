// src/service/auth/LoginService.js
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

const LoginAPI = async (postBody) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}login`, postBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { userID, userName, userRole, token } = response.data;
    const encryptedToken = CryptoJS.AES.encrypt(token, process.env.REACT_APP_PRIVATE_KEY).toString();

    sessionStorage.setItem('token', encryptedToken);
    toast.success('Login successful!');
    window.location.replace('/home');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error('Invalid username or password.');
    } else {
      toast.error('An error occurred. Please try again.');
    }
  }
};

export default LoginAPI;
