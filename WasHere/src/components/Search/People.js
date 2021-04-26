import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useRoute } from "@react-navigation/native";

import Person from "./Person";
import colors from "../../config/colors";
import { tabRouteChanged } from "../../store/search";

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.search.people);
  const isFocused = useIsFocused();
  const { name } = useRoute();

  if (isFocused) {
    dispatch({ type: tabRouteChanged.type, payload: { name } });
  }

  return (
    <View style={styles.container}>
      {people.length !== 0 && <FlatList data={people} keyExtractor={(item) => item.id} renderItem={({ item }) => <Person data={item} />} />}
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
