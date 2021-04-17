import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";

import colors from "../../config/colors";

dayjs.extend(isYesterday);

const formatTime = (timestamp) => {
  const dateTime = dayjs.unix(timestamp);
  return `${dateTime.format("HH:mm")}${dateTime.isYesterday() ? " yesterday" : ""}`;
};

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{formatTime(text)}</Text>
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
