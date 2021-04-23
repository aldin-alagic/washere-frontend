import React from "react";
import { FlatList } from "react-native";

import Post from "./Post";

const FeedList = ({ items, ...props }) => {
  return <FlatList {...props} data={items} renderItem={({ item }) => <Post data={item} />} />;
};

export default FeedList;
