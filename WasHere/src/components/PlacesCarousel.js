import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import MapSection from "../components/Post/MapSection";

import color from "../config/colors";

const PlacesCarousel = ({ places }) => {
  const [active, setActive] = useState(0);

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
          const contentWidth = data.nativeEvent.contentSize.width / places.length;
          const position = data.nativeEvent.contentOffset.x / contentWidth;
          setActive(position);
        }}>
        {places.map((place) => (
          <View style={styles.child}>
            <MapSection latitude={place.latitude} longitude={place.longitude} onPress={() => console.log("")} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorRow}>
          {[...Array(places.length)].map((_, i) => (
            <View key={i} style={[styles.indicator, { backgroundColor: active === i ? color.primary : color.mediumlight }]} />
          ))}
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 15,
    marginTop: 13,
  },
  indicatorContainer: {
    marginVertical: 12,
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
  child: {
    width: width - 40,
    justifyContent: "center",
    backgroundColor: "#FAFAFAFA",
  },
});

export default PlacesCarousel;
