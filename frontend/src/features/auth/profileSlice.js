// profileSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStates } from './loginSlice';
import { useEffect } from 'react';

export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user_profile_detail_view/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  'profile/updateUserProfileAsync',
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/user_profile_edit/${userId}/`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// const initialStates = {
//   profileData: null,
//   loading: false,
//   error: null,
// };


const profileSlice = createSlice({
  name: 'profile',
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
