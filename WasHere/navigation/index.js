import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import User from './User.js';

const Navigation = () => {
  return (
    <NavigationContainer>
      <User />
    </NavigationContainer>
  );
};

export default Navigation;
