import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { Alert } from 'react-native';

import { apiCallBegan } from './api';
import * as RootNavigation from '../navigation/RootNavigation';
import routes from '../navigation/routes';

import { API_ERROR_MESSAGE } from '../config/config.json';

const initialState = {
  token: null,
  user: null,
  loading: false,
  apiResult: {
    success: false,
    message: '',
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
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

    registered: (auth, action) => {
      const { success, message } = action.payload;
      auth.loading = false;
      Alert.alert(message);
      if (success) {
        RootNavigation.navigate(routes.WELCOME);
      }
    },

    loggedOut: (auth, action) => {
      auth.token = '';
      auth.user = {};
    },

    stateReset: (auth, action) => {
      auth = initialState;
    },

    requestFailed: (auth, action) => {
      auth.apiResult = {
        success: false,
        API_ERROR_MESSAGE,
      };
      Alert.alert(API_ERROR_MESSAGE, action.payload);
      auth.loading = false;
    },
  },
});

export const { initialStateSet, requestStarted, loggedIn, registered, loggedOut, stateReset, requestFailed } = slice.actions;
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

export const register = (fullname, username, email, password) =>
  apiCallBegan({
    url: '/user',
    method: 'POST',
    data: { role_id: 1, fullname, username, email, password, newsletter: true },
    onStart: requestStarted.type,
    onSuccess: registered.type,
    onError: requestFailed.type,
  });
