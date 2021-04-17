import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";

const RailSelected = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});

export default memo(RailSelected);
