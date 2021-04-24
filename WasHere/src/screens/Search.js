import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import Recent from "../components/Search/Recent";
import Places from "../components/Search/Places";
import People from "../components/Search/People";
import Tags from "../components/Search/Tags";
import Text from "../components/Text";
import Screen from "../components/Screen";
import configStyles from "../config/styles";
import colors from "../config/colors";
import { enterQuery } from "../store/search";

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
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onSubmitEditing = ({ nativeEvent }) => {
    console.log("NATIVE EVENT", nativeEvent);
    dispatch(enterQuery(nativeEvent.text));
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search-sharp" color={colors.dark} size={26} style={styles.searchIcon} />
          <TextInput
            style={[styles.text]}
            placeholder="Search"
            onChangeText={(text) => setText(text)}
            value={text}
            returnKeyType="search"
            onSubmitEditing={onSubmitEditing}
          />
        </View>
        <TouchableOpacity style={styles.cancelButton}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
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
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
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
  searchContainer: {
    flex: 4,
    marginRight: 20,
    marginLeft: 8,
    backgroundColor: "#FAFAFAFA",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
  },
});

export default Search;
