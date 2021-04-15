import React, { useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import PostCard from "../components/PostMarker";

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

  return (
    <MapView style={styles.map} ref={mapRef}>
      {POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
