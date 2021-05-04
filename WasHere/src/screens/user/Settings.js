import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { loggedOut } from "../../store/auth";

import colors from "../../config/colors";

const Settings = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedOut());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.button}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    fontWeight: "500",
    fontSize: 18,
    color: colors.primary,
  },
});

export default Settings;
