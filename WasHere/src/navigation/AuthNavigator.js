import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import ResetForm from '../screens/ForgotPassword/ResetForm';
import CodeForm from '../screens/ForgotPassword/CodeForm';
import ChangePasswordForm from '../screens/ForgotPassword/ChangePasswordForm';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ animationEnabled: false }}>
    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="ResetPasswordForm" component={ResetForm} options={{ headerShown: false }} />
    <Stack.Screen name="CodeForm" component={CodeForm} options={{ title: 'Verify reset code' }} />
    <Stack.Screen name="ResetChangePasswordForm" component={ChangePasswordForm} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthNavigator;
