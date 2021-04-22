import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FeedList from "../components/Feed/FeedList";
import Screen from "../components/Screen";
import { getFeed } from "../store/posts";

import colors from "../config/colors";

const Feed = () => {
  const posts = useSelector((state) => state.posts.feed);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getFeed()), []);

  return (
    <Screen style={styles.container}>
      <FeedList items={posts} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default Feed;
