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

    requestConnectionSent: (user, action) => {
      const { success, message } = action.payload;

      if (success) user.profile.requestSent = true;

      showMessage({
        message,
        icon: "success",
        type: success ? "success" : "warning",
        autoHide: true,
      });
    },
  },
});

export const { requestStarted, userFetched, myConnectionsFetched, myProfileFetched, requestConnectionSent, requestFailed } = slice.actions;
export default slice.reducer;

export const fetchMyProfile = () =>
  apiCallBegan({
    url: `/user/profile`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: myProfileFetched.type,
    onError: requestFailed.type,
  });

export const fetchUser = (userId) =>
  apiCallBegan({
    url: `/user/${userId}/profile`,
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

export const requestConnection = (userId) =>
  apiCallBegan({
    url: `/user/${userId}/request-connection`,
    method: "POST",
    onStart: requestStarted.type,
    onSuccess: requestConnectionSent.type,
    onError: requestFailed.type,
  });
