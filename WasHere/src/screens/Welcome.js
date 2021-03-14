import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import Screen from '../components/Screen';
import AppButton from '../components/Button';
import routes from '../navigation/routes';

import colors from '../config/colors';
import AppText from './../components/Text';
import { Platform } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/welcome-white.png')}
      />
      <AppText style={styles.text}>
        WasHere is a lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam
      </AppText>
      <View style={styles.buttonsContainer}>
        {Platform.OS === 'android' && (
          <AppButton
            title="Continue with Apple"
            color="black"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        )}
        <AppButton
          title="Continue with Facebook"
          color="facebook"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
        <AppButton
          title="Continue with Google"
          color="google"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
        <AppText style={styles.text}>or</AppText>
        <AppButton
          title="Sign up with E-mail"
          color="white"
          textColor="black"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
        <AppButton
          text
          textColor="black"
          title={
            <Text>
              Already have an WasHere account?
              <Text style={styles.underlined}> Sing in</Text>
            </Text>
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
    justifyContent: "center",
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
  underlined: {
    textDecorationLine: 'underline',
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
