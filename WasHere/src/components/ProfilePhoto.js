import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { profilePhoto } from "../utils/getPhotoURI";
import { navigate } from "../navigation/RootNavigation";

const ProfilePhoto = ({ profileId, photoKey, size, style }) => {
  const handleNavigateToProfile = () => {
    if (profileId) navigate("Profile", { profileId });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToProfile}>
      {photoKey ? (
        <Image
          style={[{ height: size, width: size, borderRadius: size, marginRight: 15, ...style }]}
          source={{ uri: profilePhoto(photoKey) }}
        />
      ) : (
        <Icon name="user-circle" size={size} style={{ marginRight: 15, ...style }} solid />
      )}
    </TouchableOpacity>
  );
};

export default ProfilePhoto;
