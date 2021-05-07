import React, { useRef, useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import MapView from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";

import BottomSheet from "../../components/BottomSheet";
import { Form, FormField, SubmitButton } from "../../components/form";
import ImageButton from "../../components/ImageButton";
import UserSection from "../../components/Post/UserSection";
import { createPost } from "../../store/posts";
import * as RootNavigation from "../../navigation/RootNavigation";
import { getAddress } from "../../utils/geolocation";

import colors from "../../config/colors";
import publicIcon from "../../assets/images/public.png";
import friendsIcon from "../../assets/images/friends.png";

const NewPost = () => {
  const [visibility, setVisibility] = useState("visibility");
  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.posts);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState("Loading...");
  const mapRef = useRef();
  const bottomSheetRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;

        setLocation({ latitude, longitude });

        const locationAddress = await getAddress(latitude, longitude);
        setAddress(locationAddress);
      },
      (error) => console.log(error),
    );
  }, []);

  useFocusEffect(() => bottomSheetRef.current.open());

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
    const longitude = location.longitude;
    const latitude = location.latitude;
    const photos = images.map((image) => image.data);

    dispatch(createPost(description, isPublic, latitude, longitude, photos));
  };

  return (
    <View style={styles.screen}>
      {location && (
        <MapView
          style={styles.map}
          ref={mapRef}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0022,
          }}
          mapPadding={{ bottom: 380 }}
        />
      )}
      <BottomSheet
        onClose={() => RootNavigation.goBack()}
        childrenStyle={styles.content}
        bottomSheetRef={bottomSheetRef}
        openOnLoad
        adjustToContentHeight>
        <View style={styles.sheet}>
          <UserSection user={user} location={address} />
          <Form initialValues={{ description: "" }} onSubmit={handleSubmit}>
            <View style={{ marginTop: 8 }}>
              <FormField
                height={80}
                autoCapitalize="sentences"
                multiline
                numberOfLines={3}
                autoCorrect={false}
                name="description"
                placeholder="What are you up to on this location?"
              />
            </View>
            <View style={styles.imagesContainer}>
              {images.map((image) => (
                <TouchableOpacity key={image.uri} onPress={() => handleDeleteImage(image.uri)}>
                  <Image style={styles.image} source={{ uri: image.uri }} />
                </TouchableOpacity>
              ))}
              <ImageButton onAddImage={handleAddImage} />
            </View>
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
              height={45}
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
            />
            <SubmitButton title="Post" loading={loading} customStyle={{ padding: 9 }} />
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
  sheet: {
    paddingTop: 20,
  },
  map: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 16,
    backgroundColor: colors.primary,
  },
  images: {
    marginBottom: 10,
    backgroundColor: "red",
  },
  icon: {
    marginRight: 10,
    width: 20,
    resizeMode: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 14,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
});

export default NewPost;
