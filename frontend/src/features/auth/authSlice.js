import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSignup } from '../../api/auth';

// Validation functions
const validateEmail = (email) => {
  // Basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  // Password length validation
  return password.length >= 6;
};

// Async action creator for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;

    // Validate email and password
    if (!validateEmail(email)) {
      return rejectWithValue('Invalid email format');
    }

    if (!validatePassword(password)) {
      return rejectWithValue('Password must be at least 6 characters long');
    }

    try {
      const response = await apiSignup(userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error; // If no response from server, re-throw the error
      }
      return rejectWithValue(error.response.data.detail); // Return error message from server
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    signupSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    signupFailure(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.user = null; // Reset user to null
        state.error = action.payload || action.error.message; // Set error message in state
      });
  },
});

export const { signupSuccess, signupFailure } = authSlice.actions; // Export actions
export default authSlice.reducer;
