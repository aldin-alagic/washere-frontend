import React from "react";
import { StyleSheet, Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { profilePhoto } from "../utils/getPhotoURI";

const ProfilePhoto = ({ photoKey, size }) => {
  return (
    <View>
      {photoKey ? (
        <Image style={[{ height: size, width: size, borderRadius: size }, styles.userImage]} source={{ uri: profilePhoto(photoKey) }} />
      ) : (
        <Icon name="user-circle" size={size} style={styles.icon} solid />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    marginRight: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default ProfilePhoto;
