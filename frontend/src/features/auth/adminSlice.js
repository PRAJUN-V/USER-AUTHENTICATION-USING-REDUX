import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAdminLogin } from '../../api/adminAuth';

export const adminLoginUser = createAsyncThunk(
  'auth/adminLoginUser',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await apiAdminLogin(adminData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming action.payload contains user data
        state.error = zznull;
      })
      .addCase(adminLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export default adminSlice.reducer;
