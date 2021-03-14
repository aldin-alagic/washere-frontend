import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator headerMode="none"></Stack.Navigator>
);

export default AuthNavigator;
