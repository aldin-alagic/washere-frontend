import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Likes from "./Likes";
import Comments from "./Comments";

const FooterSection = ({ likes, liked, postId, comments, onPress }) => {
  return (
    <View style={styles.footerContainer}>
      <Likes count={likes} isLiked={liked} postId={postId} />

      <TouchableOpacity onPress={onPress}>
        <Comments count={comments} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    backgroundColor: "#FAFAFAFA",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default FooterSection;
