import React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";

import colors from "../config/colors";

FlashMessage.setColorTheme({
  success: colors.primary,
});

const Toast = ({ ...props }) => {
  return <FlashMessage {...props} statusBarHeight={0} style={styles.container} titleStyle={styles.text} />;
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 15,
    marginTop: 50,
  },
  text: {
    fontSize: 15,
  },
});

export default Toast;
