import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import Tag from "./Tag";
import { changeTabRoute } from "../../store/search";

import colors from "../../config/colors";

const Tags = ({ navigation }) => {
  const dispatch = useDispatch();

  const { name } = useRoute();

  useFocusEffect(() => {
    dispatch(changeTabRoute(name));
  });

  const tags = useSelector((state) => state.search.tags);

  return (
    <View style={styles.container}>
      {tags.length != 0 ? (
        <FlatList
          data={tags}
          keyExtractor={(item) => item.post_tags_id}
          renderItem={({ item }) => <Tag data={item} navigation={navigation} />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Tags;
