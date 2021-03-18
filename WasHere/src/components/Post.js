import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import colors from '../config/colors';

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userImage}></View>
        <View style={{ justifyContent: 'space-between', padding: 4 }}>
          <Text style={[defaultStyles.text, styles.name]}>
            John Wick
            <Text style={styles.washere}> was here</Text>
          </Text>
          <Text style={styles.time}>5 mins ago</Text>
        </View>
      </View>
      <View style={styles.map}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  washere: {
    color: colors.primary,
    fontWeight: '600',
  },
  userContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  map: {
    width: '100%',
    backgroundColor: 'gray',
    height: 150,
    borderRadius: 15,
  },
  userImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    marginRight: 10,
  },
  time: {
    color: colors.medium,
  },
});

export default Post;
