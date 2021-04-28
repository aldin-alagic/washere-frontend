import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../../screens/Feed";

import { navigatorOptions, stackScreenOptions } from "./navigatorSettings";

const FeedStack = createStackNavigator();

const Feed = () => {
  return (
    <FeedStack.Navigator mode="modal" screenOptions={navigatorOptions}>
      <FeedStack.Screen name="Search" component={FeedScreen} options={{ ...stackScreenOptions, title: "Feed" }} />
    </FeedStack.Navigator>
  );
};

export default Feed;
