import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from "react-native";

import UserSection from "./UserSection";
import FooterSection from "./FooterSection";
import MapSection from "./MapSection";
import { navigate } from "../../navigation/RootNavigation";
import { postPhoto } from "../../utils/getPhotoURI";
import Carousel from "../Carousel";

const Post = ({ data }) => {
  const openPost = () => {
    navigate("PostDetails", { postId: data.id });
  };

  return (
    <View style={styles.container}>
      <UserSection user={data.user} createdAt={data.created_at} />

      <Carousel photosLength={data.photos.length}>
        <View style={[styles.child]}>
          <TouchableOpacity onPress={openPost}>
            <MapSection latitude={data.latitude} longitude={data.longitude} onPress={openPost} />
          </TouchableOpacity>
        </View>
        <View style={[styles.child]}>
          <TouchableOpacity onPress={openPost}>
            <View>
              <Text style={styles.text}>{data.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {data.photos.map((photo) => (
          <View key={photo.photo_key} style={[styles.child]}>
            <Image style={styles.image} resizeMode="cover" source={{ uri: postPhoto(photo.photo_key) }} />
          </View>
        ))}
      </Carousel>

      <FooterSection postId={data.id} likes={data._count.likes} liked={data.liked} comments={data._count.comments} onPress={openPost} />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  child: {
    width: width - 40,
    justifyContent: "center",
    backgroundColor: "#FAFAFAFA",
  },
  text: {
    textAlign: "center",
    fontWeight: "300",
    marginHorizontal: 18,
  },
  image: {
    flex: 1,
  },
});

export default Post;
