import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Welcome from "../screens/guest/Welcome";
import Intro from "../screens/guest/Intro";
import Login from "../screens/guest/Login";
import ForgottenPassword from "../screens/guest/ForgottenPassword";
import ResetCode from "../screens/guest/ResetCode";
import ChangePassword from "../screens/guest/ChangePassword";
import Register from "../screens/guest/Register";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { passedWelcomeScreen } = useSelector((state) => state.auth);
  return (
    <Stack.Navigator screenOptions={{ animationEnabled: false }}>
      {passedWelcomeScreen != true ? <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} /> : null}
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPasswordForm" component={ForgottenPassword} options={{ headerShown: false }} />
      <Stack.Screen name="CodeForm" component={ResetCode} options={{ title: "Verify reset code" }} />
      <Stack.Screen name="ResetChangePasswordForm" component={ChangePassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
