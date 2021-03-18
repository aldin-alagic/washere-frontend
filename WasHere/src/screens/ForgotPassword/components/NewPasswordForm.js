import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../../../components/Text';
import Screen from '../../../components/Screen';
import colors from '../../../config/colors';
import defaultStyles from '../../../config/styles';
import BlankSpacer from 'react-native-blank-spacer';

import { Heading } from '../../../components/form';
import WelcomeScreenGreen from '../../../assets/images/welcome-green.svg';
import BottomSheet from '../../../components/BottomSheet';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AppButton from '../../../components/Button';
import TextBox from 'react-native-password-eye';

const validationSchema = Yup.object({
  password: Yup.string().required('This field is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .required('This field is required!'),
});

const NewPasswordForm = ({ navigation }) => {
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showHideConfirmPassword, setShowHideConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });
  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleShowHideConfirmPassword = () => {
    setShowHideConfirmPassword(!showHideConfirmPassword);
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <WelcomeScreenGreen style={styles.image} />
      <BottomSheet onClose={() => navigation.goBack()}>
        <View style={styles.sheet}>
          <Heading title="Reset Password" onPress={() => navigation.goBack()} />
          <Text style={styles.helperText}>Set the new password for your account so you can login and access all the features.</Text>
          <BlankSpacer height={15} />

          <TextBox
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            value={formik.password}
            placeholder="New password"
            textContentType="newPassword"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={true}
            containerStyles={[styles.passwordInput]}
            inputStyle={defaultStyles.text}
          />
          <Text visible={formik.errors.password} style={styles.errorText}>
            {formik.errors.password}
          </Text>
          <BlankSpacer height={15} />
          <TextBox
            autoCapitalize="none"
            autoCorrect={false}
            name="confirmPassword"
            value={formik.confirmPassword}
            placeholder="Repeat new password"
            textContentType="none"
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            secureTextEntry={true}
            containerStyles={styles.passwordInput}
            inputStyle={defaultStyles.text}
          />
          <Text visible={formik.errors.confirmPassword} style={styles.errorText}>
            {formik.errors.confirmPassword}
          </Text>
          <AppButton title="Reset password" color="primary" onPress={formik.handleSubmit} />
          <BlankSpacer height={10} />
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
  passwordInput: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 6,
    paddingLeft: 10,
    width: '100%',
    height: '12%',
    alignItems: 'center',
    paddingVertical: 4,
    fontWeight: '100',
  },
  errorText: {
    color: 'red',
  },
});

export default NewPasswordForm;
