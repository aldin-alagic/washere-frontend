import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { fetchPlace } from "../../store/place";
import routes from "../../navigation/routes";

import colors from "../../config/colors";

const Place = ({ data, navigation }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          dispatch(fetchPlace(data.place_id));
          navigation.navigate(routes.PLACE_DETAILS, { placeName: data.structured_formatting.main_text });
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
