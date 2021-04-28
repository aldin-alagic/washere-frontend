import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppTabNavigator from "./AppTabNavigator";
import Post from "../screens/Post";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="PostDetails" component={Post} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
