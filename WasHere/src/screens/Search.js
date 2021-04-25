import React from "react";
import { StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Recent from "../components/Search/Recent";
import Places from "../components/Search/Places";
import People from "../components/Search/People";
import Tags from "../components/Search/Tags";
import Screen from "../components/Screen";
import configStyles from "../config/styles";
import colors from "../config/colors";
import SearchBox from "../components/Search/SearchBox";

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainerStyle}
      initialRouteName="Recent"
      tabBarOptions={{
        activeTintColor: "#000",
        labelStyle: styles.tabBarLabelStyle,
        indicatorStyle: styles.tabBarIndicatorStyle,
      }}>
      <Tab.Screen name="Recent" component={Recent} options={{ tabBarLabel: "Recent" }} />
      <Tab.Screen name="Places" component={Places} options={{ tabBarLabel: "Places" }} />
      <Tab.Screen name="People" component={People} options={{ tabBarLabel: "People" }} />
      <Tab.Screen name="Tags" component={Tags} options={{ tabBarLabel: "Tags" }} />
    </Tab.Navigator>
  );
};

const Search = () => {
  return (
    <Screen style={styles.container}>
      <SearchBox />
      <Tabs />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 14,
  },
  sceneContainerStyle: {
    backgroundColor: colors.white,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: configStyles.text.fontFamily,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.primary,
  },
});

export default Search;
