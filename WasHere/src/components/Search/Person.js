import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import colors from "../../config/colors";

const Person = ({ data }) => {
  console.log("DATA", data);
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("PRESSED PERSON");
        }}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{data.name}</Text>
          <Text style={styles.personPlace}>{data.place}</Text>
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
  personInfo: {
    flexDirection: "column",
  },
  personName: {
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  personPlace: {
    color: colors.mediumlight,
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
  },
});

export default Person;
