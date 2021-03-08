import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Map from '../screens/user/Map';
import Feed from '../screens/user/Feed';
import NewPost from '../screens/user/NewPost';
import Search from '../screens/user/Search';
import Profile from '../screens/user/Profile';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const User = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#39C555',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({color}) => <Icon name="map" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="location-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={NewPost}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="add-circle-outline" color={color} size={29} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default User;
