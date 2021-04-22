import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

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

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: colors.white }}
      initialRouteName="Recent"
      tabBarOptions={{
        activeTintColor: "#000",
        labelStyle: { fontSize: 12, fontFamily: configStyles.text.fontFamily },
        indicatorStyle: { backgroundColor: colors.primary },
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

  return (
    <Screen style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search-sharp" color={colors.dark} size={26} style={{ marginRight: 10 }} />
          <TextInput style={[styles.text]} placeholder="Search" onChangeText={(text) => setText(text)} value={text} />
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
  userImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginRight: 10,
  },
  basicInformation: {
    flexDirection: "row",
  },
  textInformation: {
    flex: 2,
    flexDirection: "column",
  },

  divider: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
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
  cancelButton: {
    flex: 1,
  },
});

export default Search;
