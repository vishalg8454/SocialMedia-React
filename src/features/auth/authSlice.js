import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";
import {toast} from 'react-toastify';

// const tokenFromLocalStorage = localStorage.getItem("token");

const initialState = {
  token: null,
  user: {},
  status: STATUSES.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = STATUSES.IDLE;
      state.user = {};
      state.token = "";
      toast.success("Logged out successfully");
      // localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if(action.payload === undefined){
          return;
        }
        state.token = action.payload.encodedToken;
        state.user = action.payload.foundUser;
        // localStorage.setItem("token", action.payload.encodedToken);
        toast.success(`Welcome ${action.payload.foundUser.firstName} ${action.payload.foundUser.lastName}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to log in");
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (data, thunkAPI) => {
    try {
      const { username, password } = data;
      const res = await axios.post("/api/auth/login", {
        username: username,
        password: password,
      });
      return res.data;
    } catch (error) {
      if(error.response.status === 404){
        toast.error("Invalid User, not found")
      }
      if(error.response.status === 401){
        toast.error("Wrong password");
      }
      thunkAPI.rejectWithValue(error);
    }
  }
);
