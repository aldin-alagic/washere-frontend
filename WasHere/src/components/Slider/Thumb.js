import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

const THUMB_RADIUS = 14;

const Thumb = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 5,
    borderColor: colors.white,
    backgroundColor: colors.primary,
  },
});

export default memo(Thumb);
