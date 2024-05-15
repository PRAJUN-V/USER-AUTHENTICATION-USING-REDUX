import { apiAdminLogin } from '../../api/adminAuth';
import { adminLoginUser } from './adminSlice';

// Example action creator for admin login
export const adminLogin = (userData) => {
  return async (dispatch) => {
    try {
      const response = await apiAdminLogin(userData);
      dispatch(adminLoginUser(response.data));
    } catch (error) {
      // Handle error
    }
  };
};
