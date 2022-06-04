import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";

const initialState = {
  posts: [],
  status: STATUSES.IDLE,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default postSlice.reducer;
export const fetchPosts = createAsyncThunk(
  "post/fetch",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/api/posts");
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
