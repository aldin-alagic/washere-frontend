import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Yup from 'yup';

import Screen from './../components/Screen';
import AppButton from './../components/Button';
import { Form, FormField, Heading, SubmitButton } from '../components/form';
import routes from '../navigation/routes';

import colors from '../config/colors';
import WelcomeScreenGreen from '../assets/images/welcome-green.svg';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const Login = ({ navigation }) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['40%', '50%', '70%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <AnimatedBackgroundColorView initialColor={colors.white} color={colors.primary} style={styles.container}>
      <Screen>
        <Text style={styles.title}>WasHere</Text>
        <WelcomeScreenGreen style={styles.image} />
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} onChange={handleSheetChanges} animateOnMount>
          <View style={styles.sheet}>
            <Heading title="Sign in" onPress={() => navigation.navigate(routes.REGISTER)} />
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
  sheet: { paddingHorizontal: 30 },
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
