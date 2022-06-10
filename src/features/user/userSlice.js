import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";
import { toast } from "react-toastify";
const initialState = {
  users: [],
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
      })
      .addCase(followUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.users = action.payload.users;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      }).addCase(unFollowUser.pending,(state,action)=>{
        state.status = STATUSES.LOADING;
      }).addCase(unFollowUser.fulfilled,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.users = action.payload.users;
      }).addCase(unFollowUser.rejected,(state,action)=>{
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

const followUser = createAsyncThunk("/user/follow", async (data, thunkAPI) => {
  try {
    const { token, userId } = data;
    const res = await axios.post(
      `/api/users/follow/${userId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const unFollowUser = createAsyncThunk(
  "/user/unFollow",
  async (data, thunkAPI) => {
    try {
      const { token, userId } = data;
      const res = await axios.post(
        `/api/users/unfollow/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export { fetchUsers, followUser, unFollowUser };
