import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from '../components/Post';

import Screen from '../components/Screen';

const POSTS = [
  {
    id: '1',
    name: 'John Wick',
    createdAt: '5 mins ago',
    latitude: 37.78825,
    longitude: -122.4324,
  },
  {
    id: '2',
    name: 'Jane Doe',
    createdAt: '27 mins ago',
    latitude: 37.78825,
    longitude: -122.4324,
  },
  {
    id: '3',
    name: 'Nick Johnson',
    createdAt: '1 hour ago',
    latitude: 37.78825,
    longitude: -122.4324,
  },
];

const Feed = () => {
  return (
    <Screen style={styles.container}>
      <FlatList data={POSTS} renderItem={({ item }) => <Post data={item} />} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Feed;
