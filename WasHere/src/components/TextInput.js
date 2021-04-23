import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import defaultStyles from "../config/styles";

const AppTextInput = ({ icon, width = "100%", ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && <Icon name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
      <TextInput placeholderTextColor={defaultStyles.colors.medium} style={[defaultStyles.text, styles.textInput]} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 10,
    overflow: "hidden",
  },
  icon: {
    marginHorizontal: 10,
  },
  textInput: {
    paddingVertical: 4,
    width: "100%",
    fontWeight: "100",
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default AppTextInput;
