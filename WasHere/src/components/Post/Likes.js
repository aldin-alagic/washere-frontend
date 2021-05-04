import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { toggleLike } from "../../store/posts";

const Likes = ({ postId, count, liked }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(toggleLike(postId))}>
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
