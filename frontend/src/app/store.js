import { configureStore } from '@reduxjs/toolkit';
import signupRed from '../features/auth/authSlice';
import loginReducer from '../features/auth/loginSlice';
import userReducer from '../features/reducers.js/reducer';
import profileSlice from '../features/auth/profileSlice'
import adminSlice from '../features/auth/adminSlice'
import logoutSlice from '../features/auth/logoutSlice';
import userSlice from '../features/auth/userSlice';


const store = configureStore({
  reducer: {
    auth: signupRed,
    loginUserData:loginReducer,
    userReducer: userReducer,
    logout:logoutSlice,
    userprofile: profileSlice,
    admin: adminSlice,
    user: userSlice,
  },
  
});

export default store;

export const initialStates = {
  profileData: null,
  loading: false,
  error: null,
};
