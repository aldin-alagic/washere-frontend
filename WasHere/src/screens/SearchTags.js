import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Tags from "../components/Search/Tags";
import TagFeed from "../components/Search/TagFeed";

const Stack = createStackNavigator();

const SearchTags = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchTags" component={Tags} />
      <Stack.Screen name="TagFeed" component={TagFeed} />
    </Stack.Navigator>
  );
};

export default SearchTags;
