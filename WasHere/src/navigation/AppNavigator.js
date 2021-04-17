import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppTabNavigator from "./AppTabNavigator";

import colors from "../config/colors";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        title: "WasHere",
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleAlign: "center",
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily: "BalooBhai2-Medium",
        },
      }}>
      <Stack.Screen name="TabNavigator" component={AppTabNavigator} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
