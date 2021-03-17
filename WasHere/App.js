import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import authStorage from './src/store/storage';

import colors from './src/config/colors';
import Navigator from './src/navigation/Navigator';

const App = () => {
  const store = configureStore();
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    await authStorage.getToken().then((token) => {
      if (token) setToken(token);
      setIsReady(true);
    });
  };

  useEffect(() => {
    setTimeout(() => restoreToken(), 1000); // The timeout is just here for preview and testing purposes
  }, []);

  // The returned view on isReady === false is a just a mock splash screen, this will be replaces with a real splash screen
  return isReady ? (
    <Provider store={store}>
      <Navigator token={token}/>
    </Provider>
  ) : (
    <View style={styles.loading}>
      <Image style={styles.image} source={require('./src/assets/images/logo.png')} />
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { height: 200, width: 200, resizeMode: 'contain', marginBottom: 20 },
});

export default App;
