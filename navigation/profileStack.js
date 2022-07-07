import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';
import AuthStack from './authStack';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#8c8cd9',
        },
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}

      <Stack.Screen
        options={{
          headerTitle: 'Edit profile',
        }}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}
