import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import jwt_decode from "jwt-decode";
import axios from "axios";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { initialStateSet, passedWelcomeScreen } from "../store/auth";
import authStorage from "../store/storage";
import Loading from "../screens/guest/Loading";
import Toast from "../components/Toast";

const Navigator = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    authStorage.getPassedWelcomeScreen().then((passedWelcome) => {
      if (passedWelcome == "true") dispatch(passedWelcomeScreen());
    });
    authStorage.getToken().then((token) => {
      if (token) {
        dispatch(initialStateSet({ token, user: jwt_decode(token) }));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      setIsReady(true);
    });
  }, []);

  if (!isReady) return <Loading />;

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <AppNavigator /> : <AuthNavigator />}
      <Toast position="top" />
    </NavigationContainer>
  );
};

export default Navigator;
