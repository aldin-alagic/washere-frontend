import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Person from "./Person";
import colors from "../../config/colors";

const people = [
  {
    id: "1",
    name: "Sara Marks",
    place: "Liverpool, England",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "2",
    name: "Jane Doe",
    place: "Karlovy Vary, Czechia",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "3",
    name: "Sage Phillips",
    place: "Nantes, France",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "4",
    name: "Saim Lugo",
    place: "Dresden, Germany",
    image: "https://i.pravatar.cc/150?img=26",
  },
];

const People = () => (
  <View style={styles.container}>
    <FlatList data={people} renderItem={({ item }) => <Person data={item} />} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default People;
