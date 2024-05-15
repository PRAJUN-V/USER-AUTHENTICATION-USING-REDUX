import axios from 'axios';

// Function to make a request to the admin login API endpoint
export const apiAdminLogin = async (adminData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/AdminLogin/', adminData);
    return response.data;
  } catch (error) {
    throw error;
  }
};