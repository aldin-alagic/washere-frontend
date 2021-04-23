import React, { useRef, useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { io } from "socket.io-client";

import PostMarker from "../components/PostMarker";
import Slider from "../components/Slider";
import { API } from "../config/config.json";

const Map = ({ navigation }) => {
  const mapRef = useRef();
  const socket = useRef();
  const [posts, setPosts] = useState([]);

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

  // Updates posts query when time range is changed
  const handleTimeRangeChange = useCallback((from, to) => {
    setPostsQuery((old) => ({ ...old, time: { from, to } }));
  }, []);

  const handleOpenPost = (post) => {
    navigation.navigate("PostDetails", post);
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
          <PostMarker key={post.id} post={post} onPress={() => handleOpenPost(post)} />
        ))}
      </MapView>
      <View style={styles.sliderContainer}>
        <Slider handleValueChange={handleTimeRangeChange} />
      </View>
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
  sliderContainer: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
  },
});

export default Map;
