import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import UserSection from "./UserSection";
import FooterSection from "./FooterSection";
import MapSection from "./MapSection";

const Post = ({ data }) => {
  return (
    <View style={styles.container}>
      <UserSection user={data.user} createdAt={data.created_at} />
      <TouchableOpacity onPress={() => console.log("Open post")}>
        <MapSection latitude={data.latitude} longitude={data.longitude} />
      </TouchableOpacity>
      <FooterSection likes={0} comments={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});

export default Post;
