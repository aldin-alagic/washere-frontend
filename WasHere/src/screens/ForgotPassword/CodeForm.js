import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, StyleSheet, View, ActivityIndicator } from 'react-native';
import BlankSpacer from 'react-native-blank-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import MailSentImage from '../../assets/images/mail-sent.svg';
import AppButton from '../../components/Button';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { verifyResetCode, requestResetCode } from '../../store/auth';

const CodeForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, resetCode, recoveryEmail } = useSelector((state) => state.auth);
  const [otpCode, setOtpCode] = useState('');
  const handleVerifyCode = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    if (resetCode) {
      navigation.push(routes.RESET_CHANGE_PASSWORD_FORM);
    }
  }, [resetCode]);
  const resendCode = () => {
    dispatch(requestResetCode(recoveryEmail));
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView style={styles.content}>
        <View>
          <View>
            <MailSentImage style={styles.image} />
            <Text style={styles.description}>
              An email with your reset code has been sent to you. Please copy the code in that message and continue with the password reset
              process.
            </Text>
            <BlankSpacer height={10} />
            <Text style={styles.description}>
              If you do not receive the password reset message within a few minutes, please check your spam folder or other filtering tools,
              or resent the email.
            </Text>
          </View>
          <BlankSpacer height={50} />
          <SmoothPinCodeInput
            ref={this.pinInput}
            value={otpCode}
            codeLength={6}
            cellSpacing={12}
            onTextChange={(code) => setOtpCode(code)}
            onFulfill={handleVerifyCode}
            textStyle={styles.pinCode}
            cellStyle={styles.cellStyle}
            containerStyle={styles.centered}
          />
        </View>
        <BlankSpacer height={50} />

        <AppButton
          title="Verify code"
          color="primary"
          onPress={() => {
            dispatch(verifyResetCode(otpCode));
          }}
        />
        <BlankSpacer height={5} />
        <Text style={styles.centered}>or</Text>
        <BlankSpacer height={5} />
        {loading ? (
          <ActivityIndicator style={{ marginTop: 10 }} size="large" color={colors.primary} />
        ) : (
          <AppButton title="Resend" color="mediumlight" textColor="black" onPress={resendCode} />
        )}
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 25,
  },
  image: {
    alignSelf: 'center',
    margin: 15,
  },
  content: { paddingHorizontal: 30 },
  centered: {
    alignSelf: 'center',
  },
  cellStyle: {
    backgroundColor: colors.light,
    borderRadius: 15,
  },
  pinCode: {
    fontSize: 20,
    color: colors.dark,
  },
});

export default CodeForm;
