import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../../config/colors";
import { profilePhoto } from "../../utils/getPhotoURI";

const Person = ({ data }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("PRESSED PERSON");
        }}>
        {data.profile_photo != null ? (
          <Image style={styles.image} source={{ uri: profilePhoto(data.profile_photo) }} />
        ) : (
          <Icon name="user-circle" solid size={60} style={styles.icon} />
        )}

        <View style={styles.personInfo}>
          <Text style={styles.personName}>{data.fullname}</Text>
          <Text style={styles.personPlace}>@{data.username}</Text>
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
  icon: {
    marginRight: 10,
  },
});

export default Person;
