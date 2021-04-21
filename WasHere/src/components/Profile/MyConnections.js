import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, ScrollView, FlatList } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import CloseButton from "../CloseButton";
import Text from "../Text";
import Connection from "./Connection";
import colors from "../../config/colors";

const connections = [
  {
    id: "1",
    user: {
      name: "John Wick",
      photoURL: "https://i.pravatar.cc/150?img=52",
    },
  },
  {
    id: "2",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
  {
    id: "3",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
    },
  },
  {
    id: "4",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
  {
    id: "5",
    user: {
      name: "John Wick",
      photoURL: "https://i.pravatar.cc/150?img=52",
    },
  },
  {
    id: "6",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
  {
    id: "7",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
    },
  },
  {
    id: "8",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
  {
    id: "9",
    user: {
      name: "John Wick",
      photoURL: "https://i.pravatar.cc/150?img=52",
    },
  },
  {
    id: "10",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
  {
    id: "11",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
    },
  },
  {
    id: "12",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
];
const MyConnections = () => {
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>My connections</Text>
        <CloseButton />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-sharp" color={colors.dark} size={26} style={{ marginRight: 10 }} />
        <TextInput style={[styles.text]} placeholder="Search by name" onChangeText={(text) => setText(text)} value={text} />
      </View>

      <FlatList style={styles.connectionsList} data={connections} renderItem={({ item }) => <Connection item={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headingText: { fontWeight: "bold", fontSize: 24 },
  searchContainer: {
    marginHorizontal: 20,
    backgroundColor: "#FAFAFAFA",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
});

export default MyConnections;
