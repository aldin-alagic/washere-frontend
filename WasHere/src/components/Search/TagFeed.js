import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FeedList from "../FeedList";
import Screen from "../Screen";
import { getFeedByTag } from "../../store/search";
import colors from "../../config/colors";

const TagFeed = () => {
  const { feed, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  console.log("FEED", feed);
  useEffect(() => dispatch(getFeed(//TODO TU STAVI TAG PO KOJEM SE SERARCHA//)), []);
  return (
    <Screen style={styles.container}>
      <FeedList
        items={feed.posts}
        onRefresh={() => dispatch(getFeedByTag())}
        refreshing={loading}
        onEndReached={() => dispatch(getFeedByTag(feed.lastPostId))}
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
