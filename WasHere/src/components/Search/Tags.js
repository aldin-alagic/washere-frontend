import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Tag from "./Tag";
import colors from "../../config/colors";

const tags = [
  {
    id: "1",
    value: "#gym",
  },
  {
    id: "2",
    value: "#food",
  },
  {
    id: "3",
    value: "#park",
  },
  {
    id: "4",
    value: "#casual",
  },
];

const Tags = () => (
  <View style={styles.container}>
    <FlatList data={tags} renderItem={({ item }) => <Tag data={item} />} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Tags;
