import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import bookmarkReducer from "../features/bookmark/bookmarkSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;
