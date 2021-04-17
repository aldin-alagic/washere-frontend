import React, { Fragment } from "react";
import Screen from "../components/Screen";
import { Text, View, Image, StyleSheet } from "react-native";
import TelegramIcon from "../assets/images/telegram.svg";
import FacebookMessengerIcon from "../assets/images/fb-messenger.svg";
import colors from "../config/colors";
const user = {
  fullname: "John Wick",
  username: "carla.smith",
  photoURL: "https://i.pravatar.cc/150?img=52",
  contact_telegram: "+385 99 123 456",
  contact_messenger: "+385 99 123 456",
  about: "Lorem ipsum et in dolor es sit amet, consectetur adipiscing elit, sed do eiusmod consectetur lorem.",
};

const connections = [
  {
    id: "1",
    user: {
      name: "John Wick",
      photoURL: "https://i.pravatar.cc/150?img=52",
    },
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    createdAt: "2021-03-18 13:15",
    likes: 7,
    comments: 5,
  },
  {
    id: "2",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
    location: {
      latitude: 37.78025,
      longitude: -122.4524,
    },
    createdAt: "2021-03-18 13:05",
    likes: 12,
    comments: 6,
  },
  {
    id: "3",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
    },
    location: {
      latitude: 37.78225,
      longitude: -122.4824,
    },
    createdAt: "2021-03-17 16:28",
    likes: 4,
    comments: 2,
  },
];

const Profile = () => {
  return (
    <Screen style={styles.container}>
      {/* Basic information 
      goes here */}
      <View style={styles.basicInformation}>
        <Image style={styles.userImage} source={{ uri: user.photoURL }} />
        <View style={styles.textInformation}>
          <Text style={{ fontSize: 20, color: colors.medium, fontWeight: "200", marginBottom: 5 }}>@{user.username}</Text>
          <View style={styles.footerContainer}>
            <Text style={{ textAlign: "justify" }}>{user.about}</Text>
          </View>
        </View>
      </View>
      <Text style={{ color: colors.primary }}>Edit profile</Text>

      <Text style={{ color: colors.mediumlight }}>Contact me</Text>
      <View style={styles.socials}>
        <View style={styles.socialMediaPlatform}>
          <TelegramIcon style={styles.socialMediaIcon} />
          <Text>{user.contact_telegram}</Text>
        </View>

        <View style={styles.socialMediaPlatform}>
          <FacebookMessengerIcon style={styles.socialMediaIcon} />
          <Text>{user.contact_telegram}</Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text>Edit profile</Text>

      <Text>My connections (27)</Text>
      <Text>23 more</Text>
      <Text>Feed</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  userImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginRight: 10,
  },
  basicInformation: {
    flexDirection: "row",
  },
  textInformation: {
    flex: 2,
    flexDirection: "column",
  },
  footerContainer: {
    flexDirection: "row",
    backgroundColor: "#FAFAFAFA",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  socials: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  socialMediaPlatform: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialMediaIcon: { width: 30, height: 30, marginRight: 10 },
});

export default Profile;
