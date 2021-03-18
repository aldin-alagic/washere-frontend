import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

import defaultStyles from '../config/styles';
import colors from '../config/colors';

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userImage}></View>
        <View style={styles.textContainer}>
          <Text style={[defaultStyles.text, styles.name]}>
            John Wick
            <Text style={styles.washere}> was here</Text>
          </Text>
          <Text style={styles.time}>5 mins ago</Text>
        </View>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>
      <View style={styles.footerContainer}>
        <View style={styles.footerSection}>
          <Icon name="heart" style={styles.icon} />
          <Text>5 likes</Text>
        </View>
        <View style={styles.footerSection}>
          <Icon name="chatbubble" style={styles.icon} />
          <Text>2 comments</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  washere: {
    color: colors.primary,
    fontWeight: '600',
  },
  userContainer: {
    flexDirection: 'row',
  },
  map: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginVertical: 13,
  },
  userImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    marginRight: 10,
  },
  time: {
    color: colors.medium,
  },
  footerContainer: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  footerSection: {
    flexDirection: 'row',
    marginRight: 15,
  },
  textContainer: {
    justifyContent: 'space-between',
    padding: 4,
  },
});

export default Post;
