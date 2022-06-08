import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";
import { toast } from "react-toastify";

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
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts.reverse();
        toast.success("Post added successfully");
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to add post");
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts.reverse();
        toast.success("Post deleted successfully");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to delete post");
      })
      .addCase(editPost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts.reverse();
        toast.success("Post edited successfully");
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to edit post");
      })
      .addCase(likePost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts.reverse();
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(unlikePost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.posts = action.payload.posts.reverse();
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
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

const createPost = createAsyncThunk("/post/create", async (data, thunkAPI) => {
  try {
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

const deletePost = createAsyncThunk("/post/delete", async (data, thunkAPI) => {
  try {
    const { token, postId } = data;
    const res = await axios.delete(`/api/posts/${postId}`, {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const editPost = createAsyncThunk("/post/edit", async (data, thunkAPI) => {
  try {
    const { token, text, postId } = data;
    const res = await axios.post(
      `/api/posts/edit/${postId}`,
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

const likePost = createAsyncThunk("/post/like", async (data, thunkAPI) => {
  try {
    const { token, postId } = data;
    const res = await axios.post(
      `/api/posts/like/${postId}`,
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

const unlikePost = createAsyncThunk("/post/unlike", async (data, thunkAPI) => {
  try {
    const { token, postId } = data;
    const res = await axios.post(
      `/api/posts/dislike/${postId}`,
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

export { fetchPosts, createPost, deletePost, editPost, likePost, unlikePost };
