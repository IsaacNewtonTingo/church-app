import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

var {width} = Dimensions.get('window');

const Welcome = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={{
          alignSelf: 'center',
          zIndex: 1,
          width: width - 60,
          height: width / 1.35,
        }}
        source={require('../assets/welcome.png')}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.signUpButton}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    padding: 20,
  },

  signUpButton: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 10,
    backgroundColor: '#330033',
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
