import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";

import colors from "../../config/colors";

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{dayjs.unix(text).format("HH:mm")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default memo(Label);
