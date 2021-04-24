import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useIsFocused, useRoute } from "@react-navigation/native";

import Place from "./Place";
import colors from "../../config/colors";
import { tabRouteChanged } from "../../store/search";

const places = [
  {
    id: "1",
    name: "Pizza Hut",
    address: "Ul. grada Vukovara 295, 10000 Zagreb",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "2",
    name: "Franko's Pizza & Bar",
    address: "Ul. Kneza Branimira 71a, 10000 Zagreb",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "3",
    name: "Omma Korean Restaurant",
    address: "Unska ul. 28, 10000 Zagreb",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "4",
    name: "Burger Bar Zagreb",
    address: "Avenija Dubrovnik 15ZV, 10000 Zagreb",
    image: "https://i.pravatar.cc/150?img=26",
  },
];

const Places = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { name } = useRoute();
  console.log("ROUTE NAME", name);
  if (isFocused) {
    dispatch({ type: tabRouteChanged.type, payload: { name } });
  }
  return (
    <View style={styles.container}>
      <FlatList data={places} renderItem={({ item }) => <Place data={item} />} />
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
