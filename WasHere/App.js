import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigation/AuthNavigator';
import { navigationRef } from './src/navigation/rootNavigation';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
