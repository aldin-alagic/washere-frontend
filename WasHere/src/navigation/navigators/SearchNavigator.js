import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../../screens/user/Search";
import Tags from "../../components/Search/Tags";
import TagFeed from "../../components/Search/TagFeed";
import Profile from "../../screens/user/Profile";
import { navigatorOptions, stackScreenOptions } from "./navigatorSettings";

const SearchStack = createStackNavigator();

const Search = () => {
  return (
    <SearchStack.Navigator mode="modal" screenOptions={navigatorOptions}>
      <SearchStack.Screen name="Search" component={SearchScreen} options={stackScreenOptions} />
      <SearchStack.Screen name="SearchTags" component={Tags} />
      <SearchStack.Screen name="TagFeed" component={TagFeed} />
      <SearchStack.Screen name="Profile" component={Profile} options={stackScreenOptions} />
    </SearchStack.Navigator>
  );
};

export default Search;
