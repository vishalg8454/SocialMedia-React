import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";
import { toast } from "react-toastify";

const initialState = {
  users: {},
  status: STATUSES.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default userSlice.reducer;

const fetchUsers = createAsyncThunk("user/fetch", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/users");
    return res.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export { fetchUsers };
