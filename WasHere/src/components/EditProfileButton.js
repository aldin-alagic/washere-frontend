import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../config/colors";

const EditProfileButton = ({ onOpenEditProfile }) => {
  return (
    <TouchableOpacity onPress={onOpenEditProfile} style={styles.button}>
      <Icon name="pencil-alt" color={colors.white} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
  },
});

export default EditProfileButton;
