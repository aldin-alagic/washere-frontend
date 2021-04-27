import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import FeedList from "../Feed/FeedList";
import { getFeed } from "../../store/posts";
import { changeTabRoute } from "../../store/search";

const Recent = () => {
  const { feed, loading } = useSelector((state) => state.posts);
  const { recentPostsQuery } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const { name } = useRoute();

  useFocusEffect(() => {
    dispatch(changeTabRoute(name));
  });

  useEffect(() => dispatch(getFeed()), []);

  return (
    <View style={styles.container}>
      <FeedList
        items={
          recentPostsQuery != ""
            ? feed.posts.filter(
                (post) =>
                  post.user.fullname.toLowerCase().includes(recentPostsQuery.toLowerCase()) ||
                  post.description.toLowerCase().includes(recentPostsQuery.toLowerCase()),
              )
            : feed.posts
        }
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
