import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppButton from "../components/Button";
import AppText from "../components/Text";
import { Form, FormField, Heading, SubmitButton } from "../components/form";
import routes from "../navigation/routes";
import BottomSheet from "../components/BottomSheet";
import { register } from "../store/auth";

import colors from "../config/colors";
import WelcomeScreenGreen from "../assets/images/welcome-green.svg";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("Full name"),
  username: Yup.string().required().min(4).label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character",
    )
    .label("Password"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = ({ fullname, username, email, password }) => {
    dispatch(register(fullname, username, email, password));
    navigation.navigate(routes.WELCOME)
  };

  return (
    <AnimatedBackgroundColorView initialColor={colors.white} color={colors.primary} style={styles.container}>
      <Screen>
        <Text style={styles.title}>WasHere</Text>
        <WelcomeScreenGreen style={styles.image} />
        <BottomSheet onClose={() => navigation.goBack()}>
          <View style={styles.sheet}>
            <Heading title="Create a new account" onClose={() => navigation.navigate(routes.WELCOME)} />
            <Form
              initialValues={{ fullname: "", username: "", email: "", password: "", passwordConfirmation: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}>
              <FormField autoCorrect={false} icon="person-outline" name="fullname" placeholder="Full name" />
              <FormField autoCorrect={false} icon="desktop-outline" name="username" placeholder="Username" />
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
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock-closed"
                name="passwordConfirmation"
                placeholder="Confirm password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="Sing up" loading={loading} />
            </Form>
            <AppButton
              text
              textColor="black"
              title={
                <View style={styles.centered}>
                  <AppText>By singin up, you agree to the Washere</AppText>
                  <AppText style={styles.underlined}>Terms of Service & Privacy Policy</AppText>
                </View>
              }
              onPress={() => navigation.navigate(routes.WELCOME)}
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
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  image: {
    flexShrink: 1,
    alignSelf: "center",
  },
  sheet: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontFamily: "BalooBhai2-Medium",
    fontSize: 42,
    textAlign: "center",
    color: colors.white,
  },
  centered: {
    textAlign: "center",
  },
  underlined: {
    textAlign: "center",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
});

export default Register;
