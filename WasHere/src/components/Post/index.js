import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import UserSection from "./UserSection";
import FooterSection from "./FooterSection";
import MapSection from "./MapSection";
import { navigate } from "../../navigation/RootNavigation";

const Post = ({ data }) => {
  const openPost = () => {
    navigate("PostDetails", { postId: data.id });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openPost}>
        <UserSection user={data.user} createdAt={data.created_at} />
        <MapSection latitude={data.latitude} longitude={data.longitude} onPress={openPost} />
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
