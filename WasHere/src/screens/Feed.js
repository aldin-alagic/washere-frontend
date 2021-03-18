import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from '../components/Post';

import Screen from '../components/Screen';

const POSTS = [
  {
    id: '1',
    user: 'John Wick',
    createdAt: '5 mins ago',
  },
  {
    id: '2',
    user: 'Jane Doe',
    createdAt: '27 mins ago',
  },
  {
    id: '3',
    user: 'Nick Johnson',
    createdAt: '1 hour ago',
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
