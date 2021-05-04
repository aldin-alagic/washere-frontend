import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";

import { toggleLike } from "../../store/posts";

const Likes = ({ postId, count, isLiked }) => {
  const [likeState, setLikeState] = useState({ liked: isLiked, likeCount: count });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(toggleLike(postId));
          setLikeState({
            likeCount: likeState.liked ? likeState.likeCount - 1 : likeState.likeCount + 1,
            liked: !likeState.liked,
          });
        }}>
        <Icon name={likeState.liked ? "heart" : "heart-outline"} color="red" style={styles.icon} />
      </TouchableOpacity>
      <Text>
        {likeState.likeCount} {likeState.likeCount == 0 ? "likes" : likeState.likeCount == 1 ? "like" : "likes"}
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
