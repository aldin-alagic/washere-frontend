import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import jwt_decode from "jwt-decode";
import FlashMessage from "react-native-flash-message";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import auth, { initialStateSet, passedWelcomeScreen } from "../store/auth";
import authStorage from "../store/storage";
import Loading from "../screens/Loading";

const Navigator = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    authStorage.getPassedWelcomeScreen().then((passedWelcome) => {
      if (passedWelcome == "true") dispatch(passedWelcomeScreen());
    });
    authStorage.getToken().then((token) => {
      if (token) dispatch(initialStateSet({ token, user: jwt_decode(token) }));
      setIsReady(true);
    });
  }, []);

  if (!isReady) return <Loading />;

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <AppNavigator /> : <AuthNavigator />}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Navigator;
