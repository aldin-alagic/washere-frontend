import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.closeContainer}>
        <Icon name="close-outline" color={colors.black} size={23} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CloseButton;
