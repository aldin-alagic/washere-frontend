import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View, StatusBar, Platform } from "react-native";

const Screen = ({ children, style, noTopPadding }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
