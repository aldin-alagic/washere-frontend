import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import Screen from '../../../components/Screen';
import colors from '../../../config/colors';

import { Form, FormField, Heading, SubmitButton } from '../../../components/form';
import WelcomeScreenGreen from '../../../assets/images/welcome-green.svg';
import BottomSheet from '../../../components/BottomSheet';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('You need to enter a valid email!').required('This field is required!'),
});

const ResetForm = ({ setStage, navigation }) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <WelcomeScreenGreen style={styles.image} />
      <BottomSheet onClose={() => navigation.goBack()}>
        <View style={styles.sheet}>
          <Heading title="Forgot password" onPress={() => navigation.goBack()} />
          <Text style={styles.helperText}>
            Please provide your e-mail address to request a password reset code. You will receive your code to your e-mail address if it is
            valid.
          </Text>
          <Form
            initialValues={{ email: '' }}
            onSubmit={(values) => {
              setStage('VERIFY_CODE');
            }}
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

            <SubmitButton title="Request code" />
          </Form>
        </View>
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  sheet: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 50,
  },
  helperText: {
    textAlign: 'justify',
  },
  title: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 42,
    textAlign: 'center',
    color: colors.white,
  },
  image: {
    margin: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default ResetForm;
