import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FeedList from "../FeedList";
import Screen from "../Screen";
import { getFeedByTag } from "../../store/search";
import colors from "../../config/colors";

const TagFeed = ({ route }) => {
  const { feed, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const tag = route.params.tag;

  useEffect(() => dispatch(getFeedByTag(tag)), []);

  return (
    <Screen style={styles.container}>
      <FeedList
        items={feed.posts}
        onRefresh={() => dispatch(getFeedByTag(tag))}
        refreshing={loading}
        onEndReached={() => dispatch(getFeedByTag(tag, feed.lastPostId))}
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

export default TagFeed;
