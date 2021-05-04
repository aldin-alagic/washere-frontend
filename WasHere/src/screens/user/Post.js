import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

import { FormField, Form } from "../../components/form";
import * as RootNavigation from "../../navigation/RootNavigation";
import BottomSheet from "../../components/BottomSheet";
import UserSection from "../../components/Post/UserSection";
import Likes from "../../components/Post/Likes";
import Comment from "../../components/Post/Comment";
import { addComment, getPost } from "../../store/posts";

import color from "../../config/colors";
import { postPhoto } from "../../utils/getPhotoURI";

const Post = ({ route }) => {
  const mapRef = useRef();
  const bottomSheetRef = useRef(null);
  const { postId } = route.params;
  const post = useSelector((state) => state.posts.post);

  const dispatch = useDispatch();

  useEffect(() => dispatch(getPost(postId)), []);

  const handleAddComment = (values, form) => {
    dispatch(addComment(postId, values.text));
    form.resetForm();
  };

  useEffect(() => {
    if (mapRef.current)
      mapRef.current.animateToRegion({
        latitude: post.latitude,
        longitude: post.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
  }, [post]);

  if (!post.id) return null;

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef} mapPadding={{ bottom: 300 }}>
        <Marker coordinate={{ latitude: parseFloat(post.latitude), longitude: parseFloat(post.longitude) }} />
      </MapView>
      <BottomSheet
        snapPoint={400}
        modalTopOffset={60}
        onClose={() => RootNavigation.goBack()}
        childrenStyle={styles.content}
        bottomSheetRef={bottomSheetRef}
        openOnLoad>
        <View style={styles.sheet}>
          <UserSection user={post.user} createdAt={post.created_at} />
          <View style={styles.postContent}>
            <Text style={styles.description}>{post.description}</Text>
            <View style={styles.imagesContainer}>
              {post.photos.map((photo) => (
                <TouchableOpacity key={photo.photo_key} onPress={() => console.log("VIEW PHOTO")}>
                  <Image style={styles.image} source={{ uri: postPhoto(photo.photo_key) }} />
                </TouchableOpacity>
              ))}
            </View>
            <Likes postId={post.id} liked={post.liked} count={post._count.likes} />
          </View>
          {post.comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
          <Form initialValues={{ text: "" }} onSubmit={handleAddComment}>
            <FormField autoCapitalize="sentences" autoCorrect={false} name="text" placeholder="Add comment" submitOnEnter />
          </Form>
        </View>
      </BottomSheet>
      <View style={styles.sliderContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sheet: {
    paddingVertical: 20,
  },
  sliderContainer: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
  },
  postContent: {
    marginVertical: 15,
    paddingBottom: 16,
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  description: {
    marginBottom: 15,
    textAlign: "justify",
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
  imagesContainer: {
    flexDirection: "row",
    marginBottom: 17,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 14,
    backgroundColor: color.light,
  },
});

export default Post;
