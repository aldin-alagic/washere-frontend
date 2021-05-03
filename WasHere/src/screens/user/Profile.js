import React, { useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Text from "../../components/Text";
import Screen from "../../components/Screen";
import FeedList from "../../components/FeedList";
import EditProfile from "../../components/Profile/EditProfile";
import MyConnections from "../../components/Profile/MyConnections";
import BottomSheet from "../../components/BottomSheet";
import ConnectionSimple from "../../components/Profile/ConnectionSimple";
import TelegramIcon from "../../assets/images/telegram.svg";
import FacebookMessengerIcon from "../../assets/images/fb-messenger.svg";
import { fetchUser, requestConnection } from "../../store/user";
import colors from "../../config/colors";
import Post from "../../components/Post";
import AppButton from "../../components/Button";
import PlacesCarousel from "../../components/PlacesCarousel";
import ProfilePhoto from "../../components/ProfilePhoto";

const Profile = ({ route, navigation }) => {
  const editProfileRef = useRef(null);
  const myConnectionsRef = useRef(null);
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const { profileId } = route.params;

  useEffect(() => dispatch(fetchUser(profileId)), [profileId]);

  useEffect(() => {
    if (profile.user?.fullname) navigation.setOptions({ title: profile.user.fullname });
  }, [profile]);

  if (!profile.user) return null;

  return (
    <>
      <Screen style={styles.container}>
        <FlatList
          data={profile.posts}
          ListHeaderComponent={
            <View style={{ marginTop: 15 }}>
              <View style={styles.basicInformation}>
                <ProfilePhoto size={100} photoKey={profile.user.profile_photo} />
                <View style={styles.textInformation}>
                  <Text style={styles.username}>@{profile.user.username}</Text>
                  <Text style={styles.text}>{profile.user.about}</Text>
                </View>
              </View>

              {profile.mutualConnections.length !== 0 && (
                <>
                  <Text style={[{ color: colors.mediumlight, marginTop: 10 }, styles.text]}>Mutual connections</Text>
                  <View style={styles.connections}>
                    <FlatList
                      style={styles.connectionsList}
                      horizontal={true}
                      data={profile.mutualConnections}
                      renderItem={({ item }) => <ConnectionSimple data={item} />}
                    />
                  </View>
                  <View style={styles.divider} />
                </>
              )}

              {!profile.connected && (
                <View>
                  <BlankSpacer height={8} />
                  <Text style={[{ color: colors.mediumlight }, styles.text]}>Mutual places visited</Text>
                  <PlacesCarousel
                    places={[
                      { id: 1, latitude: 43.123, longitude: 44.321 },
                      { id: 2, latitude: 43.123, longitude: 44.321 },
                    ]}
                  />
                  <View style={styles.divider} />
                </View>
              )}
              {!profile.connected && (
                <View style={{ marginTop: 6, marginBottom: 10 }}>
                  <AppButton
                    title={profile.requestSent ? "Pending approval" : "Connect"}
                    onPress={() => dispatch(requestConnection(profileId))}
                    color={profile.requestSent ? "mediumlight" : "primary"}
                    customStyle={{ padding: 9 }}
                  />
                </View>
              )}
              {!profile.connected && (
                <Text style={[{ color: colors.mediumlight, lineHeight: 17 }, styles.text]}>
                  Connect with {profile.user.fullname} in order to be able to see her contact information and places where she has been to.
                </Text>
              )}
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
    fontSize: 15,
  },
  basicInformation: {
    flexDirection: "row",
    marginBottom: 10,
  },
  textInformation: {
    flex: 2,
    flexDirection: "column",
  },
  aboutContainer: {
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
