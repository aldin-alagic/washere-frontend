import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { apiCallBegan } from './api';

import { API_ERROR_MESSAGE } from '../config/config.json';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    apiResult: {
      success: false,
      message: '',
    },
    recoveryEmail: null,
    resetCodeSent: false,
    resetCode: null,
    passwordResetSuccessful: false,
  },

  reducers: {
    initialStateSet: (auth, action) => {
      auth.token = action.payload.token;
      auth.user = action.payload.user;
    },

    requestStarted: (auth, action) => {
      auth.loading = true;
    },

    loggedIn: (auth, action) => {
      const { success, data, message } = action.payload;
      const token = jwt_decode(data.token);
      if (success) {
        auth.token = data.token;
        auth.user = {
          email: token.email,
          username: token.username,
          fullname: token.fullname,
          premium: token.premium,
        };
        auth.apiResult = {
          success,
          message,
        };
      }
      Alert.alert(message);
      auth.loading = false;
    },

    loggedOut: (auth, action) => {
      auth.token = '';
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
        message: 'Success!',
        description: message,
        type: 'success',
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
        message: 'Success!',
        description: message,
        type: 'success',
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
        showMessage({
          message: 'Success!',
          description: message,
          type: 'success',
          autoHide: true,
        });
      }
      auth.loading = false;
    },

    requestFailed: (auth, action) => {
      auth.loading = false;
      showMessage({
        message: API_ERROR_MESSAGE,
        description: action.payload,
        type: 'warning',
        autoHide: true,
      });
    },
  },
});

export const {
  initialStateSet,
  requestStarted,
  loggedIn,
  loggedOut,
  requestFailed,
  resetCodeRequested,
  resetCodeVerified,
  passwordReset,
} = slice.actions;
export default slice.reducer;

export const login = (email, password) =>
  apiCallBegan({
    url: '/user/login',
    method: 'POST',
    data: { email, password },
    onStart: requestStarted.type,
    onSuccess: loggedIn.type,
    onError: requestFailed.type,
  });

export const requestResetCode = (email) =>
  apiCallBegan({
    url: '/user/reset-code',
    method: 'POST',
    data: { email },
    onStart: requestStarted.type,
    onSuccess: resetCodeRequested.type,
    onError: requestFailed.type,
  });

export const verifyResetCode = (code) =>
  apiCallBegan({
    url: '/user/verify-reset-code',
    method: 'POST',
    data: { resetCode: code },
    onStart: requestStarted.type,
    onSuccess: resetCodeVerified.type,
    onError: requestFailed.type,
  });

export const resetPassword = (code, password) =>
  apiCallBegan({
    url: '/user/reset-password',
    method: 'POST',
    data: { resetCode: code, password },
    onStart: requestStarted.type,
    onSuccess: passwordReset.type,
    onError: requestFailed.type,
  });
