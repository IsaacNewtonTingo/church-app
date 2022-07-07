import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Announcements from '../screens/announcement';
import AnnouncementDetails from '../screens/announcementDetails';

const Stack = createNativeStackNavigator();

export default function AnnouncementStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerTitle: 'Announcements',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#8c8cd9',
          },
        }}
        name="Announcements"
        component={Announcements}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#8c8cd9',
          },
        }}
        name="AnnouncementDetails"
        component={AnnouncementDetails}
      />
    </Stack.Navigator>
  );
}
