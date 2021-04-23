import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";
import * as RootNavigation from "../navigation/RootNavigation";
import routes from "../navigation/routes";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loading: false,
    apiResult: {
      success: false,
      message: "",
    },
  },
  reducers: {
    requestStarted: (auth, action) => {
      auth.loading = true;
    },

    postCreated: (auth, action) => {
      const { success, message } = action.payload;
      auth.loading = false;
      showMessage({
        message: success ? "Success!" : "Error!",
        description: message,
        type: success ? "success" : "warning",
        autoHide: true,
      });
      if (success) {
        RootNavigation.navigate(routes.MAP);
      }
    },

    requestFailed: (auth, action) => {
      auth.loading = false;
      showMessage({
        message: API_ERROR_MESSAGE,
        description: action.payload,
        type: "warning",
        autoHide: true,
      });
    },
  },
});

export const { requestStarted, postCreated, requestFailed } = slice.actions;
export default slice.reducer;

export const createPost = (description, isPublic, latitude, longitude) =>
  apiCallBegan({
    url: "/post",
    method: "POST",
    data: { description, is_public: isPublic, latitude, longitude },
    onStart: requestStarted.type,
    onSuccess: postCreated.type,
    onError: requestFailed.type,
  });
