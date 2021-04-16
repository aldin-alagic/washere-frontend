import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import defaultStyles from "../../config/styles";

const Rail = () => {
  return <View style={[styles.root, defaultStyles.shadow]} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
