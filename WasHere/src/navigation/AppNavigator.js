import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppTabNavigator from "./AppTabNavigator";
import Post from "../screens/user/Post";
import Profile from "../screens/user/Profile";
import { stackScreenOptions } from "./navigators/navigatorSettings";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNavigator" component={AppTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetails" component={Post} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ ...stackScreenOptions, headerBackTitleVisible: false }} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
