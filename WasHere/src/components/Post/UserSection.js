import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import days from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { profilePhoto } from "../../utils/getPhotoURI";

import defaultStyles from "../../config/styles";
import colors from "../../config/colors";

days.extend(relativeTime);

const UserSection = ({ user, createdAt, location }) => {
  return (
    <View style={styles.userContainer}>
      <Image style={styles.userImage} source={{ uri: profilePhoto(user.profile_photo) }} />
      <View style={styles.textContainer}>
        <Text style={[defaultStyles.text, styles.name]}>
          {user.fullname}
          <Text style={styles.washere}> was here</Text>
        </Text>
        {createdAt && <Text style={styles.subText}>{days(createdAt).fromNow()}</Text>}
        {location && <Text style={styles.subText}>{location}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
  },
  userImage: {
    borderRadius: 50,
    height: 45,
    width: 45,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "space-between",
    padding: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  washere: {
    color: colors.primary,
    fontWeight: "600",
  },
  subText: {
    color: colors.medium,
    fontWeight: "300",
  },
});

export default UserSection;
