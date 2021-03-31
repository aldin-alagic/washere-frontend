import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import ForgottenPassword from '../screens/ForgottenPassword';
import ResetCode from '../screens/ResetCode';
import ChangePassword from '../screens/ChangePassword';
import Register from './../screens/Register';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ animationEnabled: false }}>
    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="ResetPasswordForm" component={ForgottenPassword} options={{ headerShown: false }} />
    <Stack.Screen name="CodeForm" component={ResetCode} options={{ title: 'Verify reset code' }} />
    <Stack.Screen name="ResetChangePasswordForm" component={ChangePassword} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthNavigator;
