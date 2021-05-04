import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";
import { navigate } from "../navigation/RootNavigation";

const SettingsButton = () => {
  return (
    <TouchableOpacity onPress={() => navigate("Settings")} style={styles.button}>
      <Icon name="cog-outline" color={colors.white} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
});

export default SettingsButton;
