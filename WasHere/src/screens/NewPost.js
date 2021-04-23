import React, { useRef, useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import BottomSheet from "../components/BottomSheet";
import { Form, FormField, SubmitButton } from "../components/form";
import ImageButton from "./../components/ImageButton";
import UserSection from "../components/Post/UserSection";
import { createPost } from "../store/posts";

import colors from "../config/colors";
import publicIcon from "../assets/images/public.png";
import friendsIcon from "../assets/images/friends.png";

const NewPost = () => {
  const { fullname: name } = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.posts);

  const [visibility, setVisibility] = useState("visibility");
  const [images, setImages] = useState([{ button: true, uri: "default" }]);

  const mapRef = useRef();
  const user = { name, photoURL: "https://i.pravatar.cc/150?img=52" };

  useEffect(() => {
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

  const handleAddImage = (image) => {
    setImages([image, ...images]);
  };

  const handleDeleteImage = (removedImage) => {
    Alert.alert("", "Do you want to remove the image?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
      },
      {
        text: "Ok",
        onPress: () => setImages(images.filter((image) => image.uri !== removedImage)),
      },
    ]);
  };

  const handleSubmit = ({ description }) => {
    const isPublic = visibility === "public" ? true : false;
    const longitude = 0;
    const latitude = 0;
    const photos = images.map((image) => image.base64);

    useDispatch(createPost(description, isPublic, latitude, longitude, photos));
  };

  const renderImage = ({ item }) => {
    return item.button ? (
      <ImageButton onAddImage={handleAddImage} />
    ) : (
      <TouchableOpacity onPress={() => handleDeleteImage(item.uri)}>
        <Image key={item.uri} style={styles.image} source={{ uri: item.uri }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef} />
      <BottomSheet onClose={() => navigation.goBack()}>
        <View style={styles.sheet}>
          <UserSection user={user} />
          <Form initialValues={{ description: "" }} onSubmit={handleSubmit}>
            <FormField
              autoCapitalize="sentences"
              multiline
              numberOfLines={3}
              autoCorrect={false}
              name="description"
              placeholder="Description"
            />
            <FlatList style={styles.images} horizontal data={images} renderItem={renderImage} keyExtractor={(image) => image.uri} />
            <SwitchSelector
              initial={0}
              onPress={(value) => setVisibility(value)}
              textColor={colors.primary}
              selectedColor={colors.white}
              buttonColor={colors.primary}
              backgroundColor={colors.light}
              borderRadius={15}
              borderWidth={0}
              valuePadding={5}
              height={50}
              hasPadding
              imageStyle={styles.icon}
              options={[
                {
                  label: "Friends",
                  value: "friends",
                  imageIcon: friendsIcon,
                },
                {
                  label: "Public",
                  value: "public",
                  imageIcon: publicIcon,
                },
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
  screen: { flex: 1 },
  sheet: { paddingVertical: 10 },
  map: { flex: 1 },
  image: { width: 100, height: 100, borderRadius: 15, marginRight: 10, backgroundColor: colors.primary },
  images: { marginBottom: 10 },
  icon: { margin: 10, resizeMode: "contain" },
});

export default NewPost;
