import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import colors from "../config/colors";

const options = {
  mediaType: "photo",
  includeBase64: true,
  maxHeight: 200,
  maxWidth: 200,
};

const ImageButton = ({ onAddImage, backgroundColor = "light", color = "primary" }) => {
  const cameraLaunch = () =>
    launchCamera(options, (res) => {
      onAddImage({
        data: res.base64,
        uri: res.uri,
      });
    });

  const imageGalleryLaunch = () =>
    launchImageLibrary(options, (res) => {
      onAddImage({
        data: res.base64,
        uri: res.uri,
      });
    });

  const onPress = () => {
    Alert.alert("", "Select how you want to add a image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
      },
      {
        text: "Camera",
        onPress: () => cameraLaunch(),
      },
      {
        text: "Gallery",
        onPress: () => imageGalleryLaunch(),
      },
    ]);
  };

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors[backgroundColor] }]} onPress={onPress}>
      <Icon name="image" color={colors[color]} size={50} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {},
  button: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageButton;
