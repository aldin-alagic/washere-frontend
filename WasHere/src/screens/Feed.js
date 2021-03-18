import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from '../components/Post';

import Screen from '../components/Screen';

const POSTS = [
  {
    id: '1',
    user: {
      name: 'John Wick',
      photoURL: 'https://i.pravatar.cc/150?img=52',
    },
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    createdAt: '2021-03-18 13:15',
    likes: 7,
    comments: 5,
  },
  {
    id: '2',
    user: {
      name: 'Jane Doe',
      photoURL: 'https://i.pravatar.cc/150?img=26',
    },
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    createdAt: '2021-03-18 13:05',
    likes: 12,
    comments: 6,
  },
  {
    id: '3',
    user: {
      name: 'Carla Smith',
      photoURL: 'https://i.pravatar.cc/150?img=27',
    },
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    createdAt: '2021-03-17 16:28',
    likes: 4,
    comments: 2,
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
