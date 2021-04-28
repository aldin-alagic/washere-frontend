import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfileScreen from "../../screens/MyProfile";

import { navigatorOptions, stackScreenOptions } from "./navigatorSettings";

const MyProfileStack = createStackNavigator();

const MyProfile = () => {
  return (
    <MyProfileStack.Navigator mode="modal" screenOptions={navigatorOptions}>
      <MyProfileStack.Screen name="Search" component={MyProfileScreen} options={stackScreenOptions} />
    </MyProfileStack.Navigator>
  );
};

export default MyProfile;
