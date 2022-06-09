import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../utils/status";
import { toast } from "react-toastify";

const initialState = {
  bookmarks: [],
  status: STATUSES.IDLE,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          return;
        }
        state.status = STATUSES.IDLE;
        state.bookmarks = action.payload.bookmarks;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToBookmark.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addToBookmark.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.bookmarks = action.payload.bookmarks;
        toast.success("Post added to Bookmark");
      })
      .addCase(addToBookmark.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to add to Bookmark");
      })
      .addCase(removeFromBookmark.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeFromBookmark.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.bookmarks = action.payload.bookmarks;
        toast.success("Post removed to Bookmark");
      })
      .addCase(removeFromBookmark.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to remove from Bookmark");
      });
  },
});

export default bookmarkSlice.reducer;

const fetchBookmarks = createAsyncThunk(
  "bookmark/fetch",
  async (data, thunkAPI) => {
    try {
      const { token } = data;
      const res = await axios.get("/api/users/bookmark", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const addToBookmark = createAsyncThunk(
  "/bookmark/add",
  async (data, thunkAPI) => {
    try {
      const { token, postId } = data;
      const res = await axios.post(
        `/api/users/bookmark/${postId}`,
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

const removeFromBookmark = createAsyncThunk(
  "/bookmark/remove",
  async (data, thunkAPI) => {
    try {
      const { token, postId } = data;
      const res = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
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

export { fetchBookmarks, addToBookmark, removeFromBookmark };
