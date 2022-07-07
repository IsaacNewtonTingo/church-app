import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeStack from './homeStack';
import AllReadings from '../screens/allReadings';
import FundingStack from './fundingStack';
import ProfileStack from './profileStack';
import ProgramsStack from './programsStack';
import AnnouncementStack from './announcementStack';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#666666',
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'black',
          padding: 10,
        },
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return <Fontisto name="money-symbol" size={size} color={color} />;
          },
        }}
        name="FundingStack"
        component={FundingStack}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name="bookshelf"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="ProgramsStack"
        component={ProgramsStack}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
        name="HomeStack"
        component={HomeStack}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialIcons name="announcement" size={size} color={color} />
            );
          },
        }}
        name="AnnouncementStack"
        component={AnnouncementStack}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return <Fontisto name="person" size={size} color={color} />;
          },
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
