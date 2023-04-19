// features/auth/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userInfo: {}, // pour stocker les infos utilisateur
  userToken: null, // pour stocker le jeton JWT
  error: null,
  msg: "", //un message
  success: false, // pour afficher le succes de register/login .
};
// register action
export const signup = createAsyncThunk("signup", async (body) => {
  console.log(body);
  const res = await axios.post("http://localhost:5000/auth/register", body);
  console.log(res.data);
  return res.data;
});
// login action
export const signin = createAsyncThunk("signin", async (body) => {
  console.log(body);
  const res = await axios.post("http://localhost:5000/auth/login", body);
  console.log(res.data);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, { payload: { error, msg } }) => {
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
        state.success = true;
      }
    },
    [signup.rejected]: (state, action) => {
      state.error = "erreur";
    },
    [signin.fulfilled]: (state, { payload: { error, msg, token, user } }) => {
      if (error) {
        state.error = error;
      } else {
        state.success = true;
        state.msg = msg;
        state.userInfo = user;
        state.userToken = token;
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
    },
    [signin.rejected]: (state, action) => {
      state.error = "erreur";
    },
  },
});

export default authSlice.reducer;
