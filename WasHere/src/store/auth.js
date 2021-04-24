import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";
import * as RootNavigation from "../navigation/RootNavigation";
import routes from "../navigation/routes";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: false,
    apiResult: {
      success: false,
      message: "",
    },
    recoveryEmail: null,
    resetCodeSent: false,
    resetCode: null,
    passwordResetSuccessful: false,
    passedWelcomeScreen: false,
  },
  reducers: {
    initialStateSet: (auth, action) => {
      auth.token = action.payload.token;
      auth.user = action.payload.user;
    },

    passedWelcomeScreen: (auth, action) => {
      auth.passedWelcomeScreen = true;
    },

    requestStarted: (auth, action) => {
      auth.loading = true;
    },

    loggedIn: (auth, action) => {
      const { success, data, message } = action.payload;
      const token = jwt_decode(data.token);
      if (success) {
        auth.token = data.token;
        auth.user = token;
        auth.apiResult = {
          success,
          message,
        };
      }
      Alert.alert(message);
      auth.loading = false;
    },

    registered: (auth, action) => {
      const { success, message } = action.payload;
      auth.loading = false;
      Alert.alert(message);
      if (success) {
        RootNavigation.navigate(routes.WELCOME);
      }
    },

    loggedOut: (auth, action) => {
      auth.token = "";
      auth.user = {};
    },

    resetCodeRequested: (auth, action) => {
      const { success, data, message } = action.payload;
      if (success) {
        auth.apiResult = {
          success,
          message,
        };
        auth.resetCodeSent = true;
        auth.recoveryEmail = data;
      }
      auth.loading = false;
      showMessage({
        message: "Success!",
        description: message,
        type: "success",
        autoHide: true,
      });
    },

    resetCodeVerified: (auth, action) => {
      const { success, data, message } = action.payload;
      if (success) {
        auth.apiResult = {
          success,
          message,
        };
        auth.resetCode = data;
      }
      auth.loading = false;
      showMessage({
        message: "Success!",
        description: message,
        type: "success",
        autoHide: true,
      });
    },

    passwordReset: (auth, action) => {
      const { success, message } = action.payload;
      if (success) {
        auth.apiResult = {
          success,
          message,
        };
        auth.passwordResetSuccessful = true;
        auth.recoveryEmail = null;
        auth.resetCodeSent = false;
        auth.resetCode = null;
        showMessage({
          message: "Success!",
          description: message,
          type: "success",
          autoHide: true,
        });
      }
      auth.loading = false;
    },

    finishPasswordReset: (auth, action) => {
      auth.passwordResetSuccessful = false;
    },

    cancelPasswordReset: (auth, action) => {
      auth.passwordResetSuccessful = true;
      auth.recoveryEmail = null;
      auth.resetCodeSent = false;
      auth.resetCode = null;
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

export const {
  initialStateSet,
  passedWelcomeScreen,
  requestStarted,
  loggedIn,
  loggedOut,
  requestFailed,
  resetCodeRequested,
  resetCodeVerified,
  registered,
  passwordReset,
  finishPasswordReset,
  cancelPasswordReset,
} = slice.actions;
export default slice.reducer;

export const login = (email, password) =>
  apiCallBegan({
    url: "/user/login",
    method: "POST",
    data: { email, password },
    onStart: requestStarted.type,
    onSuccess: loggedIn.type,
    onError: requestFailed.type,
  });

export const requestResetCode = (email) =>
  apiCallBegan({
    url: "/user/reset-code",
    method: "POST",
    data: { email },
    onStart: requestStarted.type,
    onSuccess: resetCodeRequested.type,
    onError: requestFailed.type,
  });

export const verifyResetCode = (code) =>
  apiCallBegan({
    url: "/user/verify-reset-code",
    method: "POST",
    data: { resetCode: code },
    onStart: requestStarted.type,
    onSuccess: resetCodeVerified.type,
    onError: requestFailed.type,
  });

export const resetPassword = (code, password) =>
  apiCallBegan({
    url: "/user/reset-password",
    method: "POST",
    data: { resetCode: code, password },
    onStart: requestStarted.type,
    onSuccess: passwordReset.type,
  });

export const register = (fullname, username, email, password) =>
  apiCallBegan({
    url: "/user",
    method: "POST",
    data: { role_id: 1, fullname, username, email, password, newsletter: true },
    onStart: requestStarted.type,
    onSuccess: registered.type,
    onError: requestFailed.type,
  });
