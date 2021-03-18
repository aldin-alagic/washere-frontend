import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import days from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

days.extend(relativeTime);

import defaultStyles from '../config/styles';
import colors from '../config/colors';

const Post = ({ data }) => {
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.userImage} source={{ uri: data.user.photoURL }} />
        <View style={styles.textContainer}>
          <Text style={[defaultStyles.text, styles.name]}>
            {data.user.name}
            <Text style={styles.washere}> was here</Text>
          </Text>
          <Text style={styles.time}>{days(data.createdAt).fromNow()}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Open post')}>
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          pitchEnabled={false}
          rotateEnabled={false}
          zoomEnabled={false}
          scrollEnabled={false}>
          <Marker coordinate={{ latitude: data.location.latitude, longitude: data.location.longitude }} />
        </MapView>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <View style={styles.footerSection}>
          <Icon name="heart" style={styles.icon} />
          <Text>{data.likes} likes</Text>
        </View>
        <View style={styles.footerSection}>
          <Icon name="chatbubble" style={styles.icon} />
          <Text>{data.comments} comments</Text>
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
    height: 45,
    width: 45,
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
    padding: 2,
  },
});

export default Post;
