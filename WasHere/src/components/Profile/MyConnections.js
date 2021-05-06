import React, { useState } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import CloseButton from "../CloseButton";
import Text from "../Text";
import Connection from "./Connection";

import colors from "../../config/colors";

const MyConnections = ({ myConnectionsRef }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const connections = useSelector((state) => state.user.myConnections);

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>My connections</Text>
        <CloseButton onPress={() => myConnectionsRef.current.close()} />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-sharp" color={colors.dark} size={26} style={{ marginRight: 10 }} />
        <TextInput style={[styles.text]} placeholder="Search by name" onChangeText={(text) => setSearchQuery(text)} value={searchQuery} />
      </View>

      <FlatList
        style={styles.connectionsList}
        data={connections.filter((connection) => connection.user.fullname.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={({ item }) => <Connection connection={item} />}
      />
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
