import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

export default AuthNavigator;
