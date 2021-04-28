import React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";

import colors from "../config/colors";

const Toast = ({ ...props }) => {
  return <FlashMessage {...props} statusBarHeight={0} style={styles.container} titleStyle={styles.text} />;
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 15,
    marginTop: 100,
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 15,
  },
});

export default Toast;
