import React, { useRef } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import Icon from "react-native-vector-icons/Ionicons";
import { Modalize as BottomSheet } from "react-native-modalize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Text from "../components/Text";
import Screen from "../components/Screen";
import FeedList from "../components/Feed/FeedList";
import EditProfile from "../components/Profile/EditProfile";
import MyConnections from "../components/Profile/MyConnections";
import ConnectionSimple from "../components/Profile/ConnectionSimple";
import TelegramIcon from "../assets/images/telegram.svg";
import FacebookMessengerIcon from "../assets/images/fb-messenger.svg";
import colors from "../config/colors";

const user = {
  fullname: "John Wick",
  username: "carla.smith",
  photoURL: "https://i.pravatar.cc/150?img=27",
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

const posts = [
  {
    id: "1",
    user: {
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
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
      name: "Carla Smith",
      photoURL: "https://i.pravatar.cc/150?img=27",
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
  const editProfileRef = useRef(null);
  const myConnectionsRef = useRef(null);

  const onOpenEditProfile = () => {
    editProfileRef.current.open();
  };

  const onOpenMyConnections = () => {
    myConnectionsRef.current.open();
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.basicInformation}>
        <Image style={styles.userImage} source={{ uri: user.photoURL }} />
        <View style={styles.textInformation}>
          <Text style={{ fontSize: 20, color: colors.medium, fontWeight: "200", marginBottom: 5 }}>@{user.username}</Text>
          <View style={styles.aboutContainer}>
            <Text style={[{ textAlign: "justify" }, styles.text]}>{user.about}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onOpenEditProfile}>
        <Text style={[{ color: colors.primary }, styles.text]}>Edit profile</Text>
      </TouchableOpacity>

      <BlankSpacer height={8} />
      <Text style={[{ color: colors.mediumlight }, styles.text]}>Contact me</Text>
      <BlankSpacer height={8} />
      <View style={styles.socials}>
        <View style={styles.socialMediaPlatform}>
          <TelegramIcon style={styles.socialMediaIcon} />
          <Text style={styles.text}>{user.contact_telegram}</Text>
        </View>

        <View style={styles.socialMediaPlatform}>
          <FacebookMessengerIcon style={styles.socialMediaIcon} />
          <Text style={styles.text}>{user.contact_telegram}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={[{ color: colors.mediumlight, marginTop: 10 }, styles.text]}>My connections (27)</Text>

      <View style={styles.connections}>
        <FlatList
          style={styles.connectionsList}
          horizontal={true}
          data={connections}
          renderItem={({ item }) => <ConnectionSimple data={item} />}
        />
        <TouchableOpacity style={styles.moreConnections} onPress={onOpenMyConnections}>
          <Text style={{ color: "#39C555", fontSize: 18 }}>23 more</Text>
          <Icon name="chevron-forward-outline" color={"#39C555"} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <FeedList style={{ marginTop: 10 }} items={posts} />

      <BottomSheet
        ref={editProfileRef}
        modalHeight={hp("75%")}
        handlePosition="inside"
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior="padding"
        overlayStyle={{
          borderRadius: 15,
        }}>
        <EditProfile />
      </BottomSheet>
      <BottomSheet
        ref={myConnectionsRef}
        modalHeight={hp("55%")}
        handlePosition="inside"
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior="padding"
        overlayStyle={{
          borderRadius: 15,
        }}>
        <MyConnections />
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 14,
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
  aboutContainer: {
    backgroundColor: "#FAFAFAFA",
    padding: 15,
    borderRadius: 15,
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
