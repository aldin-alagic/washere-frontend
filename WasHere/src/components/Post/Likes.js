import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Likes = ({ count, liked }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log("Pressed like!");
        }}>
        <Icon name={liked ? "heart" : "heart-outline"} color="red" style={styles.icon} />
      </TouchableOpacity>
      <Text>
        {count} {count == 0 ? "likes" : count == 1 ? "like" : "likes"}
      </Text>
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
