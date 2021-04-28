import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import Person from "./Person";
import { changeTabRoute } from "../../store/search";

import colors from "../../config/colors";

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.search.people);

  const { name } = useRoute();

  useFocusEffect(() => {
    dispatch(changeTabRoute(name));
  });

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
