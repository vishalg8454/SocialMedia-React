import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";

const tokenFromLocalStorage = localStorage.getItem("token");

const initialState = {
  token: tokenFromLocalStorage,
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
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.token = action.payload.encodedToken;
        state.user = action.payload.foundUser;
        console.log(action.payload);
        localStorage.setItem("token", action.payload.encodedToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
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
      thunkAPI.rejectWithValue(error);
    }
  }
);
