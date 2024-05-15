import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiLogin } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import decodeJWT from '../../util/tokenDecoder';
import { useReducer } from 'react';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiLogin(userData)
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error in slice',error)
      if (!error.response) {
        console.log('login slice manual ',error);
        throw error;
      }
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export const initialStates = {
    user: null,
    loading: false,
    error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialStates,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const decodeddata = decodeJWT(action.payload.access)
        console.log('decodeddata',decodeddata)
        state.loading = false;
        state.user = {
          username:decodeddata.payload.username,
          email:decodeddata.payload.email,
          id:decodeddata.payload.user_id,
          profile:decodeddata.payload.profile_pic
        };
        state.error = null;
        console.log('updated user',state.user) 
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('this is the login error payload,',action.payload)
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export default loginSlice.reducer;