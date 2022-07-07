import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Funding from '../screens/funding';
import MpesaDetails from '../screens/mPesaDetails';

const Stack = createNativeStackNavigator();

export default function FundingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',

        headerStyle: {
          backgroundColor: '#8c8cd9',
        },
      }}>
      <Stack.Screen options={{}} name="Funding" component={Funding} />
      <Stack.Screen
        options={{
          headerTitle: 'Mpesa details',
        }}
        name="MpesaDetails"
        component={MpesaDetails}
      />
    </Stack.Navigator>
  );
}
