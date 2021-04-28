import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../../config/colors";
import Hash from "../../assets/images/hash.svg";
import routes from "../../navigation/routes";

const Tag = ({ data, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(routes.TAG_FEED, { tag: data.tag });
        }}>
        <View style={styles.hash}>
          <Hash style={styles.hashIcon} />
        </View>

        <Text style={styles.name}>#{data.tag}</Text>
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
    width: 60,
    height: 60,
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
  name: {
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

export default Tag;
