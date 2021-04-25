import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import color from "../config/colors";

const Carousel = ({ children, photosLength }) => {
  const [active, setActive] = useState(0);

  const numSlides = photosLength + 2;

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.container}
        scrollEventThrottle={200}
        on
        onScroll={(data) => {
          const contentWidth = data.nativeEvent.contentSize.width / numSlides;
          const position = data.nativeEvent.contentOffset.x / contentWidth;
          setActive(position);
        }}>
        {children}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorRow}>
          {[...Array(numSlides)].map((_, i) => (
            <View key={i} style={[styles.indicator, { backgroundColor: active === i ? color.primary : color.mediumlight }]} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 13,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    alignItems: "center",
  },
  indicatorRow: {
    flexDirection: "row",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    margin: 5,
  },
});

export default Carousel;
