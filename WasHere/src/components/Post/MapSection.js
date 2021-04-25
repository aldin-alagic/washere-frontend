import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapSection = ({ latitude, longitude, onPress }) => {
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onPress={onPress}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}>
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 150,
  },
});

export default MapSection;
