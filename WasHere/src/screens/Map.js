import React, { useRef, useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import PostCard from "../components/PostMarker";
import Slider from "../components/Slider";

const POSTS = [
  {
    id: "1",
    user: {
      name: "John Wick",
      photoURL: "https://i.pravatar.cc/150?img=52",
    },
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    createdAt: "2021-03-18 13:15",
    likes: 7,
    comments: 5,
  },
  {
    id: "2",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
    location: {
      latitude: 37.78025,
      longitude: -122.4524,
    },
    createdAt: "2021-03-18 13:05",
    likes: 12,
    comments: 6,
  },
  {
    id: "3",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
    },
    location: {
      latitude: 37.78225,
      longitude: -122.4824,
    },
    createdAt: "2021-03-17 16:28",
    likes: 4,
    comments: 2,
  },
];

const Map = () => {
  const mapRef = useRef();

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

  // When post query changes, fetch new posts for that query
  useEffect(() => {
    // TODO: send request to the server to fetch posts for that map view region and timeframe
    console.log("QUERY", postsQuery);
  }, [postsQuery]);

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

  // Updates posts query when time range is changed
  const handleTimeRangeChange = useCallback((from, to) => {
    setPostsQuery((old) => ({ ...old, time: { from, to } }));
  }, []);

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
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
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
