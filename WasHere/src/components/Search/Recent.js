import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import FeedList from "../Feed/FeedList";

import { changeTabRoute, getRecentFeed } from "../../store/search";

const Recent = () => {
  const { feed, loading, recentPostsQuery } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const { name } = useRoute();

  useFocusEffect(() => {
    dispatch(changeTabRoute(name));
  });

  return (
    <View style={styles.container}>
      <FeedList
        items={feed.posts}
        keyExtractor={(item) => item.id}
        onRefresh={() => dispatch(getRecentFeed(recentPostsQuery))}
        refreshing={loading}
        onEndReached={() => dispatch(getRecentFeed(recentPostsQuery, feed.lastPostId))}
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
