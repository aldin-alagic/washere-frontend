import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

import colors from '../config/colors';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Image style={styles.image} source={require('../assets/images/logo.png')} />
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default Loading;
