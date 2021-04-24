import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FeedList from "../Feed/FeedList";
import { getFeed } from "../../store/posts";

const Recent = () => {
  const { feed, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getFeed()), []);
  return (
    <View style={styles.container}>
      <FeedList
        items={feed.posts}
        onRefresh={() => dispatch(getFeed())}
        refreshing={loading}
        onEndReached={() => dispatch(getFeed(feed.lastPostId))}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingTop: 15 },
});

export default Recent;
