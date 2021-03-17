import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import * as Yup from 'yup';

import Screen from './../components/Screen';
import AppButton from './../components/Button';
import { Form, FormField, Heading, SubmitButton } from '../components/form';
import routes from '../navigation/routes';
import BottomSheet from '../components/BottomSheet';

import colors from '../config/colors';
import WelcomeScreenGreen from '../assets/images/welcome-green.svg';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const Login = ({ navigation }) => {
  return (
    <AnimatedBackgroundColorView initialColor={colors.white} color={colors.primary} style={styles.container}>
      <Screen>
        <Text style={styles.title}>WasHere</Text>
        <WelcomeScreenGreen style={styles.image} />
        <BottomSheet onClose={() => navigation.goBack()}>
          <View style={styles.sheet}>
            <Heading title="Sign in" onPress={() => navigation.goBack()} />
            <Form
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}>
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="mail-outline"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock-closed-outline"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="Sign in" />
            </Form>
            <AppButton
              text
              textColor="black"
              title={<Text style={styles.underlined}>Forgot your password?</Text>}
              onPress={() => navigation.navigate(routes.LOGIN)}
            />
          </View>
        </BottomSheet>
      </Screen>
    </AnimatedBackgroundColorView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  sheet: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 42,
    textAlign: 'center',
    color: colors.white,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  image: {
    margin: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Login;
