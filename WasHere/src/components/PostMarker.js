import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Marker } from "react-native-maps";
import dayjs from "dayjs";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import { profilePhoto } from "../utils/getPhotoURI";

const PostMarker = ({ post, onPress, coordinate }) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={[styles.button, defaultStyles.shadow]}>
        <View style={styles.container}>
          <Image style={styles.userImage} source={{ uri: profilePhoto(post.user.profile_photo) }} />
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{post.user.fullname}</Text>
            <Text>{dayjs(post.created_at).format("HH:mm")}</Text>
          </View>
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: "row",
  },
  textContainer: {
    justifyContent: "space-between",
  },
  textName: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  userImage: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 10,
  },
});

export default PostMarker;
