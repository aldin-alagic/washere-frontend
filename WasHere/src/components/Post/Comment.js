import React from "react";
import { View, Text, StyleSheet } from "react-native";
import days from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import colors from "../../config/colors";

days.extend(relativeTime);

const Comment = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.user.fullname}</Text>
      <Text style={styles.comment}>{data.text}</Text>
      <Text style={styles.time}>{days(data.created_at).fromNow()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  comment: {
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    color: colors.medium,
    fontWeight: "300",
  },
});

export default Comment;
