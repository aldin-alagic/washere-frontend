import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FooterSection = ({ likes, comments }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerSection}>
        <Icon name="heart" color="red" style={styles.icon} />
        <Text>{likes} likes</Text>
      </View>
      <View style={styles.footerSection}>
        <Icon name="chatbubble" style={styles.icon} />
        <Text>{comments} comments</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFAFA',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  footerSection: {
    flexDirection: 'row',
    marginRight: 15,
  },
});

export default FooterSection;
