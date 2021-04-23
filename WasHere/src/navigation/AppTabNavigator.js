import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Map from "../screens/Map";
import Feed from "../screens/Feed";
import NewPost from "../screens/NewPost";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

import color from "../config/colors";

const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#39C555",
        showLabel: false,
      }}>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color }) => <Icon name="map-outline" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => <Icon name="list-outline" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={NewPost}
        options={{
          tabBarIcon: () => <Icon name="add-circle" color={color.primary} size={35} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <Icon name="search-outline" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        // TODO: Nest StackNavigator below to implement Profile screen
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Icon name="person-outline" color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default AppTabNavigator;
