import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { io } from "socket.io-client";
import { ImagePicker } from "react-native-image-picker";

import PostMarker from "../components/PostMarker";
import BottomSheet from "../components/BottomSheet";
import { Form, FormField, Heading, SubmitButton } from "../components/form";
import { API } from "../config/config.json";
import AppButton from './../components/Button';

const NewPost = () => {
  const mapRef = useRef();
  const socket = useRef();
  const [posts, setPosts] = useState([]);
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

  const selectFile = () => {
    var options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose file from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (res) => {
      console.log("Response = ", res);

      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
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
            <AppButton title="+" onPress={selectFile} />
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
