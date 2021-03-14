import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CloseButton from '../CloseButton';

const Heading = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <CloseButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Heading;
