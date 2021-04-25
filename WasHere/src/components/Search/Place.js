import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../config/colors";

const Place = ({ data }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("PRESSED PLACE");
        }}>
        <Icon name="location-outline" size={44} styles={styles.icon} />
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{data.name}</Text>
          <Text style={styles.placeAddress}>{data.formatted_address}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  placeInfo: {
    flexDirection: "column",
  },
  placeName: {
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  placeAddress: {
    color: colors.mediumlight,
  },
  icon: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
  },
});

export default Place;
