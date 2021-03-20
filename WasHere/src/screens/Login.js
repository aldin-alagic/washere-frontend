import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import * as Yup from 'yup';

import Screen from './../components/Screen';
import AppButton from './../components/Button';
import { Form, FormField, Heading, SubmitButton } from '../components/form';
import routes from '../navigation/routes';
import BottomSheet from '../components/BottomSheet';
import { login } from '../store/auth';

import colors from '../config/colors';
import WelcomeScreenGreen from '../assets/images/welcome-green.svg';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <AnimatedBackgroundColorView initialColor={colors.white} color={colors.primary} style={styles.container}>
      <Screen>
        <Text style={styles.title}>WasHere</Text>
        <WelcomeScreenGreen style={styles.image} />
        <BottomSheet onClose={() => navigation.goBack()}>
          <Heading title="Sign in" onClose={() => navigation.navigate(routes.WELCOME)} />
          <Form initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="mail-outline"
              keyboardType="email-address"
              name="email"
              placeholder="E-mail"
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
            <SubmitButton title="Sign in" loading={loading} />
          </Form>
          <AppButton
            text
            textColor="black"
            title={<Text style={styles.underlined}>Forgot your password?</Text>}
            onPress={() => navigation.navigate(routes.LOGIN)}
          />
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
    flexShrink: 1,
    alignSelf: 'center',
  },
});

export default Login;
