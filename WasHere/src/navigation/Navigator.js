import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import jwt_decode from 'jwt-decode';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { initialStateSet } from '../store/auth';
import authStorage from '../store/storage';
import Loading from '../screens/Loading';

const Navigator = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    authStorage.getToken().then((token) => {
      if (token) dispatch(initialStateSet({ token, user: jwt_decode(token) }));
      setIsReady(true);
    });
  }, []);

  if (!isReady) return <Loading />;

  return <NavigationContainer ref={navigationRef}>{token ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

export default Navigator;
