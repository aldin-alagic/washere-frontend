import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapSection = ({ latitude, longitude }) => {
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
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
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
  mapContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    marginTop: 13,
  },
  map: {
    height: 150,
  },
});

export default MapSection;
