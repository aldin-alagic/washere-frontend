import React, { useRef, useEffect } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Animated } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Text from "../components/Text";
import Screen from "../components/Screen";
import FeedList from "../components/Feed/FeedList";
import EditProfile from "../components/Profile/EditProfile";
import MyConnections from "../components/Profile/MyConnections";
import BottomSheet from "../components/BottomSheet";
import ConnectionSimple from "../components/Profile/ConnectionSimple";
import TelegramIcon from "../assets/images/telegram.svg";
import FacebookMessengerIcon from "../assets/images/fb-messenger.svg";
import { fetchUser } from "../store/user";
import colors from "../config/colors";
import Post from "../components/Post";

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

const Profile = () => {
  const editProfileRef = useRef(null);
  const myConnectionsRef = useRef(null);
  const { posts } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchUser()), []);

  const onOpenEditProfile = () => {
    editProfileRef.current.open();
  };

  const onOpenMyConnections = () => {
    myConnectionsRef.current.open();
  };

  return (
    <>
      <Screen style={styles.container}>
        <FlatList
          data={posts}
          ListHeaderComponent={
            <View style={{ marginBottom: 12 }}>
              <View style={styles.basicInformation}>
                <Image style={styles.userImage} source={{ uri: user.photoURL }} />
                <View style={styles.textInformation}>
                  <Text style={styles.username}>@{user.username}</Text>
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
                <TouchableOpacity style={styles.moreConnectionsContainer} onPress={onOpenMyConnections}>
                  <Text style={styles.moreConnections}>23 more</Text>
                  <Icon name="chevron-forward-outline" color={"#39C555"} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
            </View>
          }
          renderItem={({ item }) => <Post data={item} />}
        />
      </Screen>
      <BottomSheet
        bottomSheetRef={editProfileRef}
        modalHeight={hp("75%")}
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior="padding"
        overlayStyle={{
          borderRadius: 15,
        }}>
        <EditProfile editProfileRef={editProfileRef} />
      </BottomSheet>
      <BottomSheet
        bottomSheetRef={myConnectionsRef}
        modalHeight={hp("60%")}
        keyboardAvoidingBehavior="padding"
        modalStyle={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        customRenderer={() => (
          <Animated.View>
            <MyConnections myConnectionsRef={myConnectionsRef} />
          </Animated.View>
        )}
      />
    </>
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
    marginBottom: 15,
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
    marginBottom: 2,
  },
  connections: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  moreConnectionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreConnections: {
    color: "#39C555",
    fontSize: 15,
  },
  connectionsList: {
    marginTop: 10,
  },
  username: {
    fontSize: 20,
    color: colors.mediumlight,
    fontWeight: "200",
    marginBottom: 5,
  },
});

export default Profile;
