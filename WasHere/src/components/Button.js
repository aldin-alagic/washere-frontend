import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

const AppButton = ({ title, onPress, color = "primary", textColor = "white", text = false }) => {
  const buttonStyle = text ? styles.textButton : [styles.button, defaultStyles.shadow, { backgroundColor: colors[color] }];
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={[styles.text, { color: colors[textColor] }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 0,
  },
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 0,
  },
  text: {
    fontSize: 18,
  },
});

export default AppButton;
