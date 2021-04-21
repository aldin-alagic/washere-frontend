import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import PostMarker from "../components/PostMarker";
import BottomSheet from "../components/BottomSheet";
import UserSection from "../components/Post/UserSection";
import * as RootNavigation from "../navigation/RootNavigation";

import Likes from "../components/Post/Likes";
import Comment from "../components/Post/Comment";

const Post = () => {
  const mapRef = useRef();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Navigate to the current location on map
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        mapRef.current.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => console.log(error),
    );
  }, []);

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} ref={mapRef}>
        {posts.map((post) => (
          <PostMarker key={post.id} post={post} />
        ))}
      </MapView>
      <BottomSheet onClose={() => RootNavigation.goBack()}>
        <View style={styles.sheet}>
          <UserSection
            user={{
              name: "Filip",
              photoURL:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2017%2F09%2F01-shutterstock_476340928-Irina-Bg-1024x683.jpg&f=1&nofb=1",
            }}
            createdAt={new Date()}
          />
          <View style={styles.postContent}>
            <Text style={styles.description}>
              Lorem ipsum dolor test sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam.
            </Text>
            <Likes count={22} />
          </View>

          <Comment data={{ createdAt: new Date(), user: "Jane Doe", text: "hope you're having a great time there! :)" }} />
          <Comment data={{ createdAt: new Date(), user: "Filip Bel", text: "That's so awesome!!!!" }} />
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
});

export default Post;
