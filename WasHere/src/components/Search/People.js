import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useIsFocused, useRoute } from "@react-navigation/native";

import Person from "./Person";
import colors from "../../config/colors";
import { tabRouteChanged } from "../../store/search";

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

const People = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { name } = useRoute();
  if (isFocused) {
    dispatch({ type: tabRouteChanged.type, payload: { name } });
  }
  return (
    <View style={styles.container}>
      <FlatList data={people} renderItem={({ item }) => <Person data={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default People;
