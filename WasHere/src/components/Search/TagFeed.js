import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import FeedList from "../FeedList";
import Screen from "../Screen";
import { getFeedByTag } from "../../store/search";
import colors from "../../config/colors";

const TagFeed = ({ route }) => {
  const { feed, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { tag, navigation } = route.params;

  useEffect(() => dispatch(getFeedByTag(tag)), []);

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={styles.backButton}>
          <Icon name="chevron-back-outline" size={42} style={styles.icon} />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity>
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -8,
    marginBottom: 10,
  },
  backButtonText: { color: colors.primary, fontSize: 17 },
  icon: {
    color: colors.primary,
  },
});

export default TagFeed;
