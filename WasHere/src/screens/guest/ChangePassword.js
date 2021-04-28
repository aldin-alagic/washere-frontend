import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BlankSpacer from "react-native-blank-spacer";
import TextBox from "react-native-password-eye";
import * as Yup from "yup";

import BottomSheet from "../../components/BottomSheet";
import AppButton from "../../components/Button";
import { Heading } from "../../components/form";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import { resetPassword, finishPasswordReset } from "../../store/auth";

import WelcomeScreenGreen from "../../assets/images/welcome-green.svg";
import colors from "../../config/colors";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("This field is required!")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("This field is required!"),
});

const ChangePasswordForm = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, resetCode, passwordResetSuccessful } = useSelector((state) => state.auth);

  useEffect(() => {
    if (passwordResetSuccessful) {
      dispatch(finishPasswordReset());
      navigation.navigate(routes.LOGIN);
    }
  }, [passwordResetSuccessful]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(resetPassword(resetCode, values.password));
    },
  });

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <WelcomeScreenGreen style={styles.image} />
      <BottomSheet
        onClose={() => navigation.goBack()}
        bottomSheetRef={bottomSheetRef}
        openOnLoad={true}
        childrenStyle={styles.content}
        adjustToContentHeight>
        <View style={styles.sheet}>
          <Heading title="Reset Password" onClose={() => navigation.goBack()} />
          <Text style={styles.helperText}>Set the new password for your account so you can login and access all the features.</Text>
          <BlankSpacer height={15} />
          <TextBox
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            value={formik.password}
            placeholder="New password"
            textContentType="newPassword"
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            secureTextEntry={true}
            containerStyles={[styles.passwordInput]}
            inputStyle={[defaultStyles.text]}
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
            onChangeText={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            secureTextEntry={true}
            containerStyles={[styles.passwordInput]}
            inputStyle={[defaultStyles.text]}
          />
          <Text visible={formik.errors.confirmPassword} style={styles.errorText}>
            {formik.errors.confirmPassword}
          </Text>
          {loading ? <ActivityIndicator /> : <AppButton title="Reset password" color="primary" onPress={formik.handleSubmit} />}
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
    paddingTop: 10,
    paddingBottom: 50,
  },
  helperText: {
    textAlign: "justify",
  },
  title: {
    fontFamily: "BalooBhai2-Medium",
    fontSize: 42,
    textAlign: "center",
    color: colors.white,
  },
  image: {
    margin: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  passwordInput: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flexDirection: "row",
    padding: 6,
    paddingLeft: 10,
    width: "100%",
    height: "12%",
    alignItems: "center",
    paddingVertical: 4,
    fontWeight: "100",
  },
  errorText: {
    color: "red",
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
});

export default ChangePasswordForm;
