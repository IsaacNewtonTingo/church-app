import * as React from 'react';
import HomeScreen from '../screens/homeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MpesaDetails from '../screens/mPesaDetails';
import AnnouncementDetails from '../screens/announcementDetails';
import Announcements from '../screens/announcement';
import Donations from '../screens/donations';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#8c8cd9',
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: 'How to send money',
        }}
        name="MpesaDetails"
        component={MpesaDetails}
      />

      <Stack.Screen name="Announcements" component={Announcements} />

      <Stack.Screen
        options={{
          headerTitle: 'Donating options',
        }}
        name="Donations"
        component={Donations}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="AnnouncementDetails"
        component={AnnouncementDetails}
      />
    </Stack.Navigator>
  );
}
