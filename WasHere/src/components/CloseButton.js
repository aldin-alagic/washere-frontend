import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors';


function CloseButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Icon name="close-circle-outline" color={colors.black} size={38} />
    </TouchableOpacity>
  );
}

export default CloseButton;
