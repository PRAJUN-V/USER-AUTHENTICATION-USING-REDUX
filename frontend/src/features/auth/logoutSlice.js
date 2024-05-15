import { createSlice } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
  name: 'logout',
  initialState: {},
  reducers: {
    logout: (state) => {
      // Clear user data or perform any necessary cleanup
      state.userData = {}; // Example: Clearing user data from state
    },
  },
});

export const { logout } = logoutSlice.actions;

export default logoutSlice.reducer;
