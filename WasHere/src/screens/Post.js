import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";

import { FormField, Form } from "../components/form";
import * as RootNavigation from "../navigation/RootNavigation";
import BottomSheet from "../components/BottomSheet";
import UserSection from "../components/Post/UserSection";
import PostMarker from "../components/PostMarker";
import Likes from "../components/Post/Likes";
import Comment from "../components/Post/Comment";
import { addComment, getPost } from "../store/posts";

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

  // useEffect(() => {
  //   // Navigate to the current location on map
  //   Geolocation.getCurrentPosition(
  //     ({ coords }) => {
  //       mapRef.current.animateToRegion({
  //         latitude: coords.latitude,
  //         longitude: coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //     },
  //     (error) => console.log(error),
  //   );
  // }, []);

  if (!post.id) return null;

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef}>
        {/* <PostMarker key={post.id} post={post} /> */}
      </MapView>
      <BottomSheet
        onClose={() => RootNavigation.goBack()}
        childrenStyle={styles.content}
        bottomSheetRef={bottomSheetRef}
        adjustToContentHeight
        openOnLoad>
        <View style={styles.sheet}>
          <UserSection user={post.user} createdAt={post.created_at} />
          <View style={styles.postContent}>
            <Text style={styles.description}>{post.description}</Text>
            <Likes count={22} />
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
});

export default Post;
