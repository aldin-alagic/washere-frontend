import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';

function NewPostButton({color}) {
  return (
    <View style={styles.container}>
      <Icon name="add-circle" color={color} size={55} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 10,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
});

export default NewPostButton;
