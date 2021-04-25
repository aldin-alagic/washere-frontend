import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { queryEntered, searchPlaces } from "../../store/search";
import colors from "../../config/colors";

const SearchBox = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { activeTabRoute } = useSelector((state) => state.search);
  const onSubmitEditing = () => {
    console.log("ACTIVE TAB ROUTE", activeTabRoute);
    switch (activeTabRoute) {
      case "Places":
        dispatch(searchPlaces(text));
        break;
      case "People":
        handlePeopleSearch(text);
        break;
    }
  };
  const handlePeopleSearch = () => {};

  return (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <Icon name="search-sharp" color={colors.dark} size={26} style={styles.searchIcon} />
        <TextInput
          style={[styles.text]}
          placeholder="Search"
          onChangeText={(text) => setText(text)}
          value={text}
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      <TouchableOpacity style={styles.cancelButton}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flex: 4,
    marginRight: 20,
    marginLeft: 8,
    backgroundColor: "#FAFAFAFA",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
  },
});

export default SearchBox;
