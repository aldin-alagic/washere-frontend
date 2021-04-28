import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "user",
  initialState: {
    information: {},
    posts: null,
    myConnections: [],
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
        user.information = data.user;
      }
    },

    myConnectionsFetched: (user, action) => {
      const { success, data } = action.payload;
      user.loading = false;

      if (success) {
        user.myConnections = data;
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

export const { requestStarted, userFetched, myConnectionsFetched, requestFailed } = slice.actions;
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

export const fetchMyConnections = () =>
  apiCallBegan({
    url: `/user/connections`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: myConnectionsFetched.type,
    onError: requestFailed.type,
  });
