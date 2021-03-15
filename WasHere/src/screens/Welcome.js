import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import AppButton from '../components/Button';
import routes from '../navigation/routes';

import colors from '../config/colors';
import AppText from './../components/Text';
import WelcomeScreenWhite from '../assets/images/welcome-white.svg';
import { Platform } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <WelcomeScreenWhite style={styles.image} />
      <AppText style={styles.description}>
        WasHere is a lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam
      </AppText>
      <View style={styles.buttonsContainer}>
        <AppButton title="Continue with Facebook" color="facebook" onPress={() => navigation.navigate(routes.REGISTER)} />
        <AppButton title="Continue with Google" color="google" onPress={() => navigation.navigate(routes.REGISTER)} />
        <AppText style={styles.text}>or</AppText>
        <AppButton title="Sign up with E-mail" color="white" textColor="black" onPress={() => navigation.navigate(routes.REGISTER)} />
        <AppButton
          text
          textColor="black"
          title={
            <>
              <Text>Already have a WasHere account?{'\n'}</Text>
              <Text style={[styles.underlined, styles.centered]}>Sign in</Text>
            </>
          }
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    padding: 10,
  },
  title: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 42,
    textAlign: 'center',
    color: colors.primary,
  },
  text: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  centered: {
    textAlign: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Welcome;
