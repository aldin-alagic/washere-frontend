import React from "react";
import { StyleSheet, View } from "react-native";

import Likes from "./Likes";
import Comments from "./Comments";

const FooterSection = ({ likes, comments }) => {
  return (
    <View style={styles.footerContainer}>
      <Likes count={likes} />
      <Comments count={comments} />
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
