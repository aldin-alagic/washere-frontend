import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import TelegramIcon from "../../assets/images/telegram.svg";
import FacebookMessengerIcon from "../../assets/images/fb-messenger.svg";
import CloseButton from "../CloseButton";
import Text from "../Text";
import Button from "../Button";

import colors from "../../config/colors";
import ProfilePhoto from "../ProfilePhoto";

const user = {
  fullname: "John Wick",
  username: "carla.smith",
  email: "carla.smith@gmail.com",
  photoURL: "https://i.pravatar.cc/150?img=27",
  contact_telegram: "+385 99 123 456",
  contact_messenger: "+385 99 123 456",
  about: "Lorem ipsum et in dolor es sit amet, consectetur adipiscing elit, sed do eiusmod consectetur lorem.",
};

const EditProfile = ({ editProfileRef }) => {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user.myProfile);

  useEffect(() => {
    console.log(user.user);
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Edit profile</Text>
        <CloseButton onPress={() => editProfileRef.current.close()} />
      </View>
      <View style={styles.photoInformation}>
        <ProfilePhoto photoKey={user.user.profile_photo} size={100} />

        <BlankSpacer height={15} />
        <TouchableOpacity>
          <Text style={[styles.text, styles.actions]}>Take photo</Text>
        </TouchableOpacity>

        <BlankSpacer height={6} />
        <TouchableOpacity>
          <Text style={[styles.text, styles.actions]}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInformation}>
        <Text style={([styles.text], { color: colors.medium })}>Bio</Text>
        <View style={styles.bioContainer}>
          <TextInput multiline={true} onChangeText={(text) => setText(text)} value={text} />
        </View>
        <BlankSpacer height={6} />
        <Text style={([styles.text], { color: colors.medium })}>My contact information</Text>
        <View style={styles.socialMediaContactContainer}>
          <TelegramIcon style={styles.socialMediaIcon} />
          <Text style={[{ textAlign: "justify" }, styles.text]}>{user.contact_telegram}</Text>
        </View>
        <BlankSpacer height={18} />
        <View style={styles.socialMediaContactContainer}>
          <FacebookMessengerIcon style={styles.socialMediaIcon} />
          <Text style={[{ textAlign: "justify" }, styles.text]}>{user.contact_telegram}</Text>
        </View>
        <Text style={[styles.text, styles.actions, { textAlign: "right", marginTop: 10 }]}>Add other</Text>
        <BlankSpacer height={8} />
        <Text style={([styles.text], { color: colors.medium, marginBottom: 10 })}>Account settings</Text>
        <View style={styles.mailContainer}>
          <Icon name="mail-outline" color={colors.mediumlight} size={28} style={{ marginRight: 10 }} />
          <Text style={[styles.text]}>{user.email}</Text>
        </View>
        <Button
          title="Save changes"
          onPress={() => {
            console.log("Clicked");
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  photoInformation: {
    flexDirection: "column",
    alignItems: "center",
  },
  profileInformation: { marginHorizontal: 20 },
  actions: {
    color: colors.primary,
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headingText: { fontWeight: "bold", fontSize: 24 },
  userImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginBottom: 5,
  },
  bioContainer: {
    backgroundColor: "#FAFAFAFA",
    padding: 15,
    borderRadius: 10,
  },
  mailContainer: {
    backgroundColor: "#FAFAFAFA",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  socialMediaContactContainer: {
    backgroundColor: "#FAFAFAFA",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 5,
  },
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    padding: 10,
  },
});

export default EditProfile;
