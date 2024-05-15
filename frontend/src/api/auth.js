import axios from 'axios';

export const apiSignup = async (userData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/signup/', userData);
    return response.data; 
  } catch (error) {
    if (error.response) {
      
      console.error('Server Error:', error.response.data);
      return error.response.data;
    } else if (error.request) {
     
      console.error('Request Error:', error.request);
      return { error: 'No response received from the server' };
    } else {
      
      console.error('Error:', error.message);
      return { error: 'An error occurred while sending the request' }; 
    }
  }
};


export const apiLogin = async (userData) => {
  console.log('slice backend readched',userData)
  return await axios.post('http://localhost:8000/api/login/', userData);
};
