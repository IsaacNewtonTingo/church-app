import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Programs from '../screens/programs';
import ProgramDetails from '../screens/programDetails';

const Stack = createNativeStackNavigator();

export default function ProgramsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',

        headerStyle: {
          backgroundColor: '#8c8cd9',
        },
      }}>
      <Stack.Screen name="Programs" component={Programs} />
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="ProgramDetails"
        component={ProgramDetails}
      />
    </Stack.Navigator>
  );
}
