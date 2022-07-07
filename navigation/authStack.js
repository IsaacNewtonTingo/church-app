import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Registration from '../screens/registration';
import SignUp from '../screens/signUp';
import Login from '../screens/login';
import HomeStack from './homeStack';
import TabNav from './tabNav';
import Welcome from '../screens/welcome';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',

        headerStyle: {
          backgroundColor: '#8c8cd9',
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: 'Signup',
        }}
        name="SignUp"
        component={SignUp}
      />

      <Stack.Screen options={{}} name="Registration" component={Registration} />

      <Stack.Screen options={{}} name="Login" component={Login} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Welcome}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TabNav"
        component={TabNav}
      />
    </Stack.Navigator>
  );
}
