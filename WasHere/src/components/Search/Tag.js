import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import colors from "../../config/colors";
import Hash from "../../assets/images/hash.svg";

const Place = ({ data }) => {
  console.log("DATA", data);
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("PRESSED TAG");
        }}>
        <View style={styles.hash}>
          <Hash style={styles.hashIcon} />
        </View>

        <Text style={styles.tagValue}>{data.value}</Text>
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
  hash: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  hashIcon: {
    width: 30,
    height: 30,
  },
  tagValue: {
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  placeAddress: {
    color: colors.mediumlight,
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
  },
});

export default Place;
