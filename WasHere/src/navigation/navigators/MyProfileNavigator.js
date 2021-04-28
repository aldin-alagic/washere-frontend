import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyProfileScreen from "../../screens/user/MyProfile";
import { navigatorOptions, stackScreenOptions } from "./navigatorSettings";
import SettingsButton from "../../components/SettingsButton";

const MyProfileStack = createStackNavigator();

const MyProfile = () => {
  return (
    <MyProfileStack.Navigator mode="modal" screenOptions={navigatorOptions}>
      <MyProfileStack.Screen
        name="Search"
        component={MyProfileScreen}
        options={{
          ...stackScreenOptions,
          title: "My Profile",
          headerRight: SettingsButton,
        }}
      />
    </MyProfileStack.Navigator>
  );
};

export default MyProfile;
