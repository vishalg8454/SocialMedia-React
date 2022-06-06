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
        state.posts = action.payload.posts.reverse();
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        console.log("pending");
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts.reverse();
        console.log("fulfilled");
        console.log(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        console.log("rejected");
      });
  },
});

export default postSlice.reducer;
const fetchPosts = createAsyncThunk("post/fetch", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/posts");
    return res.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const createPost = createAsyncThunk("/api/create", async (data, thunkAPI) => {
  try {
    console.log(data);
    const { token, text } = data;
    const res = await axios.post(
      "/api/posts",
      { postData: text },
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

export { fetchPosts, createPost };
