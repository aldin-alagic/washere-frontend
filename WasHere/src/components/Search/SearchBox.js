import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { searchPlaces, searchPeople, searchTags, getRecentFeed, changeRecentQuery } from "../../store/search";
import colors from "../../config/colors";

const SearchBox = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { activeTabRoute } = useSelector((state) => state.search);

  const handleTextChange = (text) => {
    setText(text);
    switch (activeTabRoute) {
      case "Recent":
        if (text != "") {
          dispatch(changeRecentQuery(text));
          dispatch(getRecentFeed(text));
        }
        break;
      case "Places":
        dispatch(searchPlaces(text));
        break;
      case "People":
        dispatch(searchPeople(text));
        break;
      case "Tags":
        dispatch(searchTags(text));
        break;
    }
  };

  return (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <Icon name="search-sharp" color={colors.dark} size={26} style={styles.searchIcon} />
        <TextInput style={[styles.text]} placeholder="Search" onChangeText={handleTextChange} value={text} />
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={() => handleTextChange("")}>
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
