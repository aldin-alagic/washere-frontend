import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import UserSection from './UserSection';
import FooterSection from './FooterSection';
import MapSection from './MapSection';

const Post = ({ data }) => {
  return (
    <View style={styles.container}>
      <UserSection user={data.user} createdAt={data.createdAt} />
      <TouchableOpacity onPress={() => console.log('Open post')}>
        <MapSection location={data.location} />
      </TouchableOpacity>
      <FooterSection likes={data.likes} comments={data.comments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});

export default Post;
