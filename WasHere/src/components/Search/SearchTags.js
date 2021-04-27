import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tags from "./Tags";
import TagFeed from "./TagFeed";

const Stack = createStackNavigator();

const SearchTags = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "", headerTitle: "", headerShown: false }}>
      <Stack.Screen name="SearchTags" component={Tags} />
      <Stack.Screen name="TagFeed" component={TagFeed} />
    </Stack.Navigator>
  );
};

export default SearchTags;
