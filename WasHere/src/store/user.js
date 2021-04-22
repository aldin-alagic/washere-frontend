import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "user",
  initialState: {
    posts: null,
    loading: false,
  },
  reducers: {
    requestStarted: (user, action) => {
      user.loading = true;
    },

    userFetched: (user, action) => {
      const { success, message, data } = action.payload;
      user.loading = false;
      if (success) {
        user.posts = data.posts;
      }
    },

    requestFailed: (user, action) => {
      user.loading = false;
      showMessage({
        message: API_ERROR_MESSAGE,
        description: action.payload,
        type: "warning",
        autoHide: true,
      });
    },
  },
});

export const { requestStarted, userFetched, requestFailed } = slice.actions;
export default slice.reducer;

export const fetchUser = (id) =>
  apiCallBegan({
    url: `/user/${id}`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: userFetched.type,
    onError: requestFailed.type,
  });
