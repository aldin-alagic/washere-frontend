import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import ResetForm from '../screens/ForgotPassword/ResetForm';
import CodeForm from '../screens/ForgotPassword/CodeForm';
import ChangePasswordForm from '../screens/ForgotPassword/ChangePasswordForm';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ResetPasswordForm" component={ResetForm} />
    <Stack.Screen name="CodeForm" component={CodeForm} />
    <Stack.Screen name="ResetChangePasswordForm" component={ChangePasswordForm} />
  </Stack.Navigator>
);

export default AuthNavigator;
