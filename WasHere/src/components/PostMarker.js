import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Marker } from "react-native-maps";
import dayjs from "dayjs";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

const PostMarker = ({ post }) => {
  return (
    <Marker
      coordinate={{
        latitude: post.location.latitude,
        longitude: post.location.longitude,
      }}>
      <TouchableOpacity style={[styles.button, defaultStyles.shadow]} onPress={() => console.log("test")}>
        <View style={styles.container}>
          <Image style={styles.userImage} source={{ uri: post.user.photoURL }} />
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{post.user.name}</Text>
            <Text>{dayjs(post.createdAt).format("HH:mm")}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
