import React from "react";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { profilePhoto } from "../utils/getPhotoURI";

const ProfilePhoto = ({ photoKey, size, style }) => {
  return (
    <View>
      {photoKey ? (
        <Image
          style={[{ height: size, width: size, borderRadius: size, marginRight: 15, ...style }]}
          source={{ uri: profilePhoto(photoKey) }}
        />
      ) : (
        <Icon name="user-circle" size={size} style={{ marginRight: 15, ...style }} solid />
      )}
    </View>
  );
};

export default ProfilePhoto;
