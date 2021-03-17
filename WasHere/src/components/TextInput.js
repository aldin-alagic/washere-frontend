import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import defaultStyles from '../config/styles';

const AppTextInput = ({ icon, width = '100%', ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && <Icon name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
      <TextInput placeholderTextColor={defaultStyles.colors.medium} style={[defaultStyles.text, styles.textInput]} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 6,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  textInput: {
    paddingVertical: 4,
    fontWeight: '100',
  },
});

export default AppTextInput;
