import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';

import Screen from '../components/Screen';
import AppButton from '../components/Button';
import routes from '../navigation/routes';

import colors from '../config/colors';
import AppText from './../components/Text';
import WelcomeScreenWhite from '../assets/images/welcome-white.svg';

const Welcome = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <WelcomeScreenWhite style={styles.image} />
      <AppText style={styles.description}>
        WasHere lets you connect with people based on locations that you visit. What are you waiting for? {'\n'} Start exploring!
      </AppText>
      <AppButton title="Continue with Facebook" color="facebook" onPress={() => navigation.navigate(routes.REGISTER)} />
      <AppButton title="Continue with Google" color="google" onPress={() => navigation.navigate(routes.REGISTER)} />
      <AppText style={styles.centered}>or</AppText>
      <AppButton title="Sign up with E-mail" color="white" textColor="black" onPress={() => navigation.navigate(routes.REGISTER)} />
      <AppButton
        text
        textColor="black"
        title={
          <View style={styles.centered}>
            <AppText>Already have a WasHere account?</AppText>
            <AppText style={styles.underlined}>Sign in</AppText>
          </View>
        }
        onPress={() => navigation.navigate(routes.LOGIN)}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 42,
    textAlign: 'center',
    color: colors.primary,
  },
  image: {
    flexShrink: 1,
    alignSelf: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  centered: {
    textAlign: 'center',
  },
  underlined: {
    textAlign: 'center',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});

export default Welcome;
