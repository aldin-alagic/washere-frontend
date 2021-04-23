import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Likes = ({ count }) => {
  return (
    <View style={styles.container}>
      <Icon name="chatbubble" style={styles.icon} />
      <Text>{count} comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  container: {
    flexDirection: "row",
    marginRight: 15,
  },
});

export default Likes;
