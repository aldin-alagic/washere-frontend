import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, StyleSheet, View, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppButton from '../components/Button';
import AppText from '../components/Text';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import { verifyResetCode, requestResetCode } from '../store/auth';

import MailSentImage from '../assets/images/mail-sent.svg';
import colors from '../config/colors';

const CodeForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, resetCode, recoveryEmail } = useSelector((state) => state.auth);
  const [otpCode, setOtpCode] = useState('');

  useEffect(() => {
    if (resetCode) {
      navigation.navigate(routes.RESET_CHANGE_PASSWORD_FORM);
    }
    if (!recoveryEmail) {
      navigation.navigate(routes.LOGIN);
    }
  }, [resetCode, recoveryEmail]);

  return (
    <Screen style={styles.container} noTopPadding>
      <ScrollView>
        <KeyboardAvoidingView behavior={'position'}>
          <MailSentImage height={hp('25%')} style={styles.image} />
          <AppText style={styles.description}>
            An email with your reset code has been sent to you. Please copy the code in that message and continue with the password reset
            process.
          </AppText>
          <AppText style={styles.description}>
            If you do not receive the password reset message within a few minutes, please check your spam folder or other filtering tools,
            or resent the email.
          </AppText>
          <View style={styles.buttonsContainer}>
            <SmoothPinCodeInput
              ref={this.pinInput}
              value={otpCode}
              codeLength={6}
              autoFocused={true}
              cellSpacing={6}
              onTextChange={(code) => setOtpCode(code)}
              onFulfill={Keyboard.dismiss}
              textStyle={styles.pinCode}
              cellStyle={styles.cellStyle}
              containerStyle={styles.otpInputContainer}
            />
            <AppButton
              title="Verify code"
              color="primary"
              onPress={() => {
                dispatch(verifyResetCode(otpCode));
              }}
            />
            <AppText style={styles.text}>or</AppText>
            <View style={styles.buttons}>
              {loading ? (
                <ActivityIndicator style={{ marginTop: 10 }} size="large" color={colors.primary} />
              ) : (
                <AppButton title="Resend" color="mediumlight" textColor="black" onPress={() => dispatch(requestResetCode(recoveryEmail))} />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    marginTop: 10,
    marginBottom: 10,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  otpInputContainer: {
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    padding: 25,
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  cellStyle: {
    backgroundColor: colors.light,
    borderRadius: 15,
    paddingHorizontal: 2,
  },
  pinCode: {
    fontSize: 20,
    color: colors.dark,
  },
});

export default CodeForm;
