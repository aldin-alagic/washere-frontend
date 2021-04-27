import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import Map from "../screens/Map";
import Feed from "../screens/Feed";
import NewPost from "../screens/NewPost";
import SearchScreen from "../screens/Search";
import Profile from "../screens/Profile";
import Tags from "../components/Search/Tags";
import TagFeed from "../components/Search/TagFeed";

import color from "../config/colors";

const Tab = createBottomTabNavigator();

const SearchStack = createStackNavigator();

const Search = () => {
  return (
    <SearchStack.Navigator mode="modal" screenOptions={{ headerBackTitle: "", headerTitle: "" }}>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <SearchStack.Screen name="SearchTags" component={Tags} />
      <SearchStack.Screen name="TagFeed" component={TagFeed} />
    </SearchStack.Navigator>
  );
};

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
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Icon name="person-outline" color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default AppTabNavigator;
