import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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
        <Icon name="location-outline" size={44} style={styles.icon} />
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{data.structured_formatting.main_text}</Text>
          <Text style={styles.placeAddress}>{data.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
    marginRight: 10,
  },
});

export default Place;
