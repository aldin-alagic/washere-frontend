import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "user",
  initialState: {
    myProfile: {
      information: {},
      posts: null,
    },
    myConnections: [],
    profile: {},
    loading: false,
  },
  reducers: {
    requestStarted: (user, action) => {
      user.loading = true;
    },

    myProfileFetched: (user, action) => {
      const { success, data } = action.payload;
      user.loading = false;
      if (success) {
        user.myProfile = data;
      }
    },

    userFetched: (user, action) => {
      const { success, message, data } = action.payload;
      user.loading = false;
      if (success) {
        user.profile = data;
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

export const { requestStarted, userFetched, myConnectionsFetched, myProfileFetched, requestFailed } = slice.actions;
export default slice.reducer;

export const fetchMyProfile = (id) =>
  apiCallBegan({
    url: `/user/profile`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: myProfileFetched.type,
    onError: requestFailed.type,
  });

export const fetchUser = (id) =>
  apiCallBegan({
    url: `/user/${id}/profile`,
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
