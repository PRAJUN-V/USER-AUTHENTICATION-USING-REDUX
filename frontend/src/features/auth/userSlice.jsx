import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import decodeJWT from "../../util/tokenDecoder";

// Action creator for async login
export const loginUserAsync = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login/",
      userData
    );
    const data = response.data;
    console.log(data, data.user);
    dispatch(loginSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.message || "An error occurred"));
  }
};

export const updateProfileAsync = (userId, formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/user_profile_edit/${userId}/`,
      formData
    );
    const data = response.data;
    dispatch(updateSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(updateFailure(error.message || "An error occurred"));
  }
};

const states = {
  user: null,
  loading: null,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: states,
  reducers: {
    loginSuccess: (state, action) => {
      const decodeddata = decodeJWT(action.payload.access);
      console.log("decodeddata", decodeddata);
      state.loading = false;
      state.user = {
        username: decodeddata.payload.username,
        email: decodeddata.payload.email,
        id: decodeddata.payload.user_id,
        profile: decodeddata.payload.profile_pic,
      };
      state.error = null;
      console.log("Reached success");
    },
    loginFailure: (state, action) => {
      console.log("Failed");
      state.loading = false;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      console.log("update success", action.payload);
      const updatedUser = action.payload;
      console.log("update success", updatedUser);
      state.loading = false;
      state.user = {
        ...state.user,
        username: updatedUser.username,
        email: updatedUser.email,
        profile: updatedUser.profile_pic
      };
      state.error = null;
    },
    updateFailure: (state, action) => {
        console.log("Failed");
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, updateSuccess, updateFailure } =
  userSlice.actions;
export default userSlice.reducer;