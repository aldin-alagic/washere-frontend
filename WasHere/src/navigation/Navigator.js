import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import jwt_decode from 'jwt-decode';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { initialStateSet } from '../store/auth';
import authStorage from '../store/storage';

const Navigator = ({ token }) => {
  const dispatch = useDispatch();
  const { token: storeToken } = useSelector((state) => state.auth);

  // I had to do this here and not in App.js because App.js is not wrapped with the Store provider. This is a temp solution - I think that checks that follow can be made in a better way or in a different component...
  if (storeToken && !token) authStorage.storeToken(storeToken);
  // This will be triggered when the user has logged in and the app is re-rendering, token from the store is set in the storage
  else if (token && !storeToken) dispatch(initialStateSet({ token, user: jwt_decode(token) })); // This will be triggered when the user has exited and started the app again, token from the storage is set in the store

  return <NavigationContainer>{storeToken ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

export default Navigator;
