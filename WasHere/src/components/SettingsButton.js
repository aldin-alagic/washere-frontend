import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";

const SettingsButton = () => {
  return (
    <TouchableOpacity onPress={() => console.log("AA")} style={styles.button}>
      <Icon name="cog-outline" color={colors.white} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
});

export default SettingsButton;
