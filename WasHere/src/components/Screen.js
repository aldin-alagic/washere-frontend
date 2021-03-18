import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../config/colors';

const Screen = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, style, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top }]}>
      <View style={[styles.view, style]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
