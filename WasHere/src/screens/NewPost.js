import React, { useRef, useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { StyleSheet, View, Text, TouchableOpacity, Button, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import BottomSheet from "../components/BottomSheet";
import { Form, FormField, Heading, SubmitButton } from "../components/form";
import AppButton from "./../components/Button";
import ImageButton from "./../components/ImageButton";
import colors from "../config/colors";

const NewPost = () => {
  const mapRef = useRef();
  const [visibility, setVisibility] = useState("visibility");
  const [images, setImages] = useState([{ button: true }]);
  const { loading, apiResult } = useSelector((state) => state.auth);

  const handleAddImage = (image) => {
    console.log("image", image.uri);
    console.log("images", images.length);
    setImages([image, ...images]);
  };

  const deleteImage = (removedImage) => {
    setImages(images.filter((image) => image.uri !== removedImage));
  };

  useEffect(() => {
    // Navigate to the current location on map
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        mapRef.current.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => console.log(error),
    );
  }, []);

  const handleSubmit = ({ fullname, username, email, password }) => {
    dispatch(register(fullname, username, email, password));
  };

  const renderImage = ({ index, item }) => {
    return item.button ? (
      <ImageButton style={styles.imageButton} onAddImage={handleAddImage} />
    ) : (
      <TouchableOpacity onPress={() => deleteImage(item.uri)}>
        <Image key={item.uri} style={styles.image} source={{ uri: item.uri }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef} />
      <BottomSheet onClose={() => navigation.goBack()}>
        <View style={styles.sheet}>
          <Heading title="Create a new post" onClose={() => navigation.navigate(routes.MAP)} />
          <Form initialValues={{ description: "" }} onSubmit={handleSubmit}>
            <FormField autoCapitalize="words" autoCorrect={false} icon="person-outline" name="description" placeholder="Description" />
            <FlatList style={styles.images} horizontal data={images} renderItem={renderImage} />
            <SwitchSelector
              initial={0}
              onPress={(value) => setVisibility(value)}
              textColor={colors.primary} //'#7a44cf'
              selectedColor={colors.white}
              buttonColor={colors.primary}
              backgroundColor={colors.light}
              borderRadius={15}
              borderWidth={0}
              valuePadding={5}
              height={50}
              hasPadding
              options={[
                { label: "Friends", value: "friends", },
                { label: "Public", value: "public" },
              ]}
              testID="visibility-switch-selector"
              accessibilityLabel="visibility-switch-selector"
            />
            <SubmitButton title="Post" loading={loading} />
          </Form>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: "#3740ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 12,
  },
  image: { width: 100, height: 100, borderRadius: 15, marginRight: 10, backgroundColor: colors.primary },
  images: {
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
  },
});

export default NewPost;
