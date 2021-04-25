import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useRoute } from "@react-navigation/native";

import Place from "./Place";
import colors from "../../config/colors";
import { tabRouteChanged } from "../../store/search";

const Places = () => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.search.places);
  const isFocused = useIsFocused();
  const { name } = useRoute();
  console.log("ROUTE NAME", name);
  if (isFocused) {
    dispatch({ type: tabRouteChanged.type, payload: { name } });
  }
  return (
    <View style={styles.container}>
      {places.length !== 0 && <FlatList data={places} renderItem={({ item }) => <Place data={item} />} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Places;
