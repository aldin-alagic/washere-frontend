import React from "react";
import { View, StyleSheet } from "react-native";
import FeedList from "../Feed/FeedList";

const posts = [
  {
    id: "1",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=26",
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
      name: "Carla Smith",
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

const Recent = () => (
  <View style={styles.container}>
    <FeedList items={posts} showsVerticalScrollIndicator={false} />
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingTop: 15 },
});

export default Recent;
