import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import bookmarkReducer from "../features/bookmark/bookmarkSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    bookmark: bookmarkReducer,
    user: userReducer,
  },
});

export default store;
