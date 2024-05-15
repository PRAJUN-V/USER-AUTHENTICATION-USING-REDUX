import { signupSuccess, signupFailure } from './authSlice';
import { apiSignup } from '../../api/auth';

export const signupUser = (userData) => async (dispatch) => {
  try {
    const response = await apiSignup(userData);
    dispatch(signupSuccess(response.data));
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};
