import React from "react";
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import Icon from "react-native-vector-icons/Ionicons";

import Screen from "../components/Screen";
import Connection from "../components/Profile/Connection";
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
  },
  {
    id: "2",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
  },
  {
    id: "3",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
    },
  },
  {
    id: "4",
    user: {
      name: "Jane Doe",
      photoURL: "https://i.pravatar.cc/150?img=26",
    },
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
      <BlankSpacer height={8} />
      <Text style={{ color: colors.mediumlight }}>Contact me</Text>
      <BlankSpacer height={8} />
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

      <View style={styles.divider} />

      <Text style={{ color: colors.mediumlight, marginTop: 10 }}>My connections (27)</Text>

      <View style={styles.connections}>
        <FlatList
          style={styles.connectionsList}
          horizontal={true}
          data={connections}
          renderItem={({ item }) => <Connection data={item} />}
        />
        <TouchableOpacity style={styles.moreConnections}>
          <Text style={{ color: "#39C555", fontSize: 18 }}>23 more</Text>
          <Icon name="chevron-forward-outline" color={"#39C555"} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      {/* Bottom section goes here */}
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
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  divider: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  connections: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  moreConnections: { flexDirection: "row", alignItems: "center" },
  connectionsList: { marginTop: 10 },
});

export default Profile;
