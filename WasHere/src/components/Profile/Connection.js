import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import colors from "../../config/colors";
import ProfilePhoto from "../ProfilePhoto";

dayjs.extend(relativeTime);

const Connection = ({ connection }) => {
  return (
    <View style={styles.connectionContainer}>
      <ProfilePhoto profileId={connection.user.id} size={50} photoKey={connection.user.profile_photo} />
      <View style={styles.connectionInfo}>
        <Text style={styles.fullName}>{connection.user.fullname}</Text>
        <Text style={styles.date}>Connection since {dayjs(connection.accepted_at).format("MMM DD, YYYY")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  connectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  connectionInfo: {
    flexDirection: "column",
  },
  fullName: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 15,
  },
  date: {
    color: colors.mediumlight,
    fontSize: 15,
  },
});

export default Connection;
