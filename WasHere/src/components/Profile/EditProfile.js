import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import { useSelector, useDispatch } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useFormik } from "formik";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

import TelegramIcon from "../../assets/images/telegram.svg";
import FacebookMessengerIcon from "../../assets/images/fb-messenger.svg";
import CloseButton from "../CloseButton";
import Text from "../Text";
import Button from "../Button";

import colors from "../../config/colors";
import ProfilePhoto from "../ProfilePhoto";
import { updateProfile, updateProfilePhoto } from "../../store/user";

const options = {
  mediaType: "photo",
  includeBase64: true,
};

const EditProfile = ({ editProfileRef }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.myProfile);
  const { loading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      contact_telegram: user.contact_telegram,
      contact_messenger: user.contact_messenger,
      about: user.about,
    },
    onSubmit: (values) => {
      if (Object.keys(values).length != 0) dispatch(updateProfile(values));
      if (image) dispatch(updateProfilePhoto(image.data));

      editProfileRef.current.close();
    },
  });

  const [image, setImage] = useState(null);

  const handleAddImage = (image) => {
    setImage(image);
  };

  const cameraLaunch = () =>
    launchCamera(options, (res) => {
      handleAddImage({
        data: res.base64,
        uri: res.uri,
      });
    });

  const imageGalleryLaunch = () =>
    launchImageLibrary(options, (res) => {
      handleAddImage({
        data: res.base64,
        uri: res.uri,
      });
    });

  return (
    <ScrollView>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Edit profile</Text>
        <CloseButton onPress={() => editProfileRef.current.close()} />
      </View>
      <View style={styles.photoInformation}>
        {image ? <Image style={styles.userImage} source={{ uri: image.uri }} /> : <ProfilePhoto photoKey={user.profile_photo} size={100} />}

        <BlankSpacer height={15} />
        <TouchableOpacity onPress={cameraLaunch}>
          <Text style={[styles.text, styles.actions]}>Take photo</Text>
        </TouchableOpacity>

        <BlankSpacer height={6} />
        <TouchableOpacity onPress={imageGalleryLaunch}>
          <Text style={[styles.text, styles.actions]}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInformation}>
        <Text style={([styles.text], { color: colors.medium })}>About me</Text>
        <View style={styles.aboutMeContainer}>
          <TextInput
            multiline={true}
            id="about"
            name="about"
            type="text"
            placeholder="About you"
            value={formik.values.about}
            onChangeText={formik.handleChange("about")}
          />
        </View>
        <BlankSpacer height={6} />
        <Text style={([styles.text], { color: colors.medium })}>My contact information</Text>
        <View style={styles.socialMediaContactContainer}>
          <TelegramIcon style={styles.socialMediaIcon} />

          <TextInput
            style={[{ textAlign: "justify" }, styles.text]}
            id="contact_telegram"
            name="contact_telegram"
            type="text"
            onChangeText={formik.handleChange("contact_telegram")}
            placeholder="Telegram contact"
            value={formik.values.contact_telegram}
          />
        </View>
        <BlankSpacer height={18} />
        <View style={styles.socialMediaContactContainer}>
          <FacebookMessengerIcon style={styles.socialMediaIcon} />
          <TextInput
            style={[{ textAlign: "justify" }, styles.text]}
            id="contact_messenger"
            name="contact_messenger"
            type="text"
            onChangeText={formik.handleChange("contact_messenger")}
            placeholder="Facebook Messenger contact"
            value={formik.values.contact_messenger}
          />
        </View>

        <BlankSpacer height={20} />
        <Text style={([styles.text], { color: colors.medium, marginBottom: 10 })}>Email</Text>
        <View style={styles.mailContainer}>
          <Icon name="mail-outline" color={colors.mediumlight} size={28} style={{ marginRight: 10 }} />
          <TextInput
            style={[{ textAlign: "justify" }, styles.text]}
            id="email"
            name="email"
            type="text"
            onChangeText={formik.handleChange("email")}
            placeholder={user.email}
            value={formik.values.email}
          />
        </View>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 10 }} size="large" color={colors.primary} />
        ) : (
          <Button title="Save changes" onPress={formik.handleSubmit} loading={loading} />
        )}
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
    marginRight: 15,
  },
  aboutMeContainer: {
    backgroundColor: "#FAFAFAFA",
    padding: 10,
    borderRadius: 10,
    height: hp("10%"),
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
