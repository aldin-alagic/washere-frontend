import React from "react";
import { StyleSheet, Image } from "react-native";

const Connection = ({ data }) => {
  return <Image style={styles.userImage} source={{ uri: data.user.photoURL }} />;
};

const styles = StyleSheet.create({
  userImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 15,
  },
});

export default Connection;
