import React, { useRef, useEffect, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { StyleSheet, View, Text, TouchableOpacity, Button, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { io } from "socket.io-client";
import PostMarker from "../components/PostMarker";
import BottomSheet from "../components/BottomSheet";
import { Form, FormField, Heading, SubmitButton } from "../components/form";
import { API } from "../config/config.json";
import AppButton from "./../components/Button";
import ImageButton from "./../components/ImageButton";
import colors from "../config/colors";

const NewPost = () => {
  const mapRef = useRef();
  const socket = useRef();
  const [posts, setPosts] = useState([]);
  const [visibility, setVisibility] = useState("visibility");

  const { loading, apiResult } = useSelector((state) => state.auth);

  // Keeps track of the region the user is viewing on the map and time range he has selected
  const [postsQuery, setPostsQuery] = useState({
    locationFrom: {
      latitude: 0,
      longitude: 0,
    },
    locationTo: {
      latitude: 0,
      longitude: 0,
    },
    time: {
      from: 0,
      to: 0,
    },
  });

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

    // Connect to the websocket server
    socket.current = io(API);
    socket.current.on("posts", (posts) => setPosts(posts));

    return () => socket.current.close();
  }, []);

  // When post query changes, fetch new posts for that query
  useEffect(() => socket.current.emit("fetch near me", postsQuery), [postsQuery]);

  const handleSubmit = ({ fullname, username, email, password }) => {
    dispatch(register(fullname, username, email, password));
  };

  // Updates post query when map region is changed
  const handleRegionChange = ({ latitude, latitudeDelta, longitude, longitudeDelta }) => {
    const locationFrom = {
      latitude: latitude - latitudeDelta,
      longitude: longitude + longitudeDelta,
    };

    const locationTo = {
      latitude: latitude + latitudeDelta,
      longitude: longitude - latitudeDelta,
    };
    setPostsQuery((old) => ({ ...old, locationFrom, locationTo }));
  };

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef} onRegionChangeComplete={handleRegionChange}>
        {posts.map((post) => (
          <PostMarker key={post.id} post={post} />
        ))}
      </MapView>
      <BottomSheet onClose={() => navigation.goBack()}>
        <View style={styles.sheet}>
          <Heading title="Create a new post" onClose={() => navigation.navigate(routes.MAP)} />
          <Form initialValues={{ description: "" }} onSubmit={handleSubmit}>
            <FormField autoCapitalize="words" autoCorrect={false} icon="person-outline" name="description" placeholder="Description" />
            <ImageButton />
            <SwitchSelector
              initial={0}
              onPress={(value) => setVisibility(value)}
              textColor={colors.primary} //'#7a44cf'
              selectedColor={colors.white}
              buttonColor={colors.primary}
              borderColor={colors.primary}
              borderRadius={15}
              borderWidth={2}
              valuePadding={5}
              height={47}
              hasPadding
              options={[
                { label: "Friends", value: "friends" },
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
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
  },
});

export default NewPost;
