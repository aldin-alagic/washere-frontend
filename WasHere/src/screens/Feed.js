import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FeedList from "../components/FeedList";
import Screen from "../components/Screen";
import { getFeed } from "../store/posts";

import colors from "../config/colors";

const Feed = () => {
  const { feed, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getFeed()), []);

  return (
    <Screen style={styles.container}>
      <FeedList
        items={feed.posts}
        onRefresh={() => dispatch(getFeed())}
        refreshing={loading}
        onEndReached={() => dispatch(getFeed(feed.lastPostId))}
        onEndReachedThreshold={0.8}
      />
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
