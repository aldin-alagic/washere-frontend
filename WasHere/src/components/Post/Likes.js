import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { toggleLike } from "../../store/posts";

const Likes = ({ postId, count, isLiked }) => {
  const [likeState, setLikeState] = useState({ liked: isLiked, likeCount: count });

  const dispatch = useDispatch();

  const handleToggleLike = () => {
    dispatch(toggleLike(postId));
    setLikeState((oldState) => ({
      likeCount: oldState.liked ? oldState.likeCount - 1 : oldState.likeCount + 1,
      liked: !oldState.liked,
    }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleLike}>
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
