import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import colors from "../../config/colors";

const Connection = ({ data }) => {
  return (
    <View style={styles.connectionContainer}>
      <Image style={styles.userImage} source={{ uri: data.user.photoURL }} />
      <View style={styles.connectionInfo}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>{data.user.name}</Text>
        <Text style={{ color: colors.mediumlight }}>Connection since July 8th</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 15,
  },
  connectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  connectionInfo: {
    flexDirection: "column",
  },
});

export default Connection;
