import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import colors from "../config/colors";

const options = {
  mediaType: "photo",
  includeBase64: true,
};

const ImageButton = ({ backgroundColor = "light", color = "primary" }) => {
  const [image, setImage] = useState({});

  const cameraLaunch = () => launchCamera(options, (res) => {
    setImage({
      data: res.base64,
      uri: res.uri,
    });
  });

  const imageGalleryLaunch = () => launchImageLibrary(options, (res) => {
    setImage({
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
      <Icon name="image-outline" color={colors[color]} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {},
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 0,
  },
});

export default ImageButton;
