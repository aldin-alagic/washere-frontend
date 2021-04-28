import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import AppIntroSlider from "react-native-app-intro-slider";

import Screen from "../../components/Screen";
import { passedWelcomeScreen } from "../../store/auth";
import authStorage from "../../store/storage";

import OnlineConnection from "../../assets/images/online-connection.svg";
import Connected from "../../assets/images/connected.svg";
import LocationTracking from "../../assets/images/location-tracking.svg";
import Map from "../../assets/images/map.svg";

const Intro = () => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: "1",
      title: "Welcome!",
      text: "We are glad to have you onboard! Swipe right to see how WasHere can help you connect with other people!",
      image: OnlineConnection,
    },
    {
      key: "2",
      title: "Check in at various places",
      text:
        "You can check in at places around the world to mark that you have visited a place or landmark. Share a photo or two while you're at it!",
      image: LocationTracking,
    },
    {
      key: "3",
      title: "Explore the map",
      text: "Explore a vast map for places of interest and other people that have checked in at those places.",
      image: Map,
    },
    {
      key: "4",
      title: "Connect with others",
      text:
        "Find new connections and future friends based on mutual places/points of interests that you visit. Lastly, don't forget to have fun!",
      image: Connected,
    },
  ];

  const renderItem = ({ item }) => {
    const Image = item.image;

    return (
      <Screen style={styles.slide}>
        <View style={styles.content}>
          <Image style={styles.image} height={hp("25%")} width={wp("75%")} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </Screen>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={async () => {
        await authStorage.setPassedWelcomeScreen();
        dispatch(passedWelcomeScreen());
      }}
      onSkip={async () => {
        await authStorage.setPassedWelcomeScreen();
        dispatch(passedWelcomeScreen());
      }}
      showSkipButton
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#39C555",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
    paddingHorizontal: "8%",
  },
  image: {
    marginBottom: 40,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontSize: 17,
  },
  title: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default Intro;
