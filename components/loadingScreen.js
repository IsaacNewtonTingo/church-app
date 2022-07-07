import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';

export default function LoadingScreen() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontWeight: '700'}}>Loading</Text>
      <ActivityIndicator color="gray" size="large" animating={true} />
    </View>
  );
}
