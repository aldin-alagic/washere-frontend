import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="Welcome"
      component={Welcome}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
