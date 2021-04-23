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
  const [visibility, setVisibility] = useState("visibility");
  const { fullname: name } = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.posts);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const mapRef = useRef();
  const dispatch = useDispatch();

  const user = { name, photoURL: "https://i.pravatar.cc/150?img=52" };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;

        setLocation({ latitude, longitude });

        mapRef.current.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => console.log(error),
    );
  }, []);

  const handleAddImage = (image) => {
    console.log(image);
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

    console.log(description, isPublic, latitude, longitude, photos);

    dispatch(createPost(description, isPublic, latitude, longitude, photos));
  };

  const renderImage = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleDeleteImage(item.uri)}>
        <Image key={item.uri} style={styles.image} source={{ uri: item.uri }} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(({ coords }) => {
      mapRef.current.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0022,
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef} showsUserLocation={true} mapPadding={{ bottom: 380 }} />
      <BottomSheet onClose={() => navigation.goBack()}>
        <View style={styles.sheet}>
          <UserSection user={user} />
          <Form initialValues={{ description: "" }} onSubmit={handleSubmit}>
            <FormField
              height={80}
              autoCapitalize="sentences"
              multiline
              numberOfLines={3}
              autoCorrect={false}
              name="description"
              placeholder="What are you up to on this location?"
            />
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
  sheet: {
    paddingVertical: 10,
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
});

export default NewPost;
