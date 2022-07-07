import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

var {width} = Dimensions.get('window');

export default function Registration({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [isPosting, setIsPosting] = useState(false);

  const empty = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  const validate = () => {
    if (!firstName || !lastName || !phoneNumber) {
      Alert.alert('All field are required');
    } else {
      setIsPosting(true);
      handleRegistration();
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  async function handleRegistration() {
    await firestore().collection('Users').doc(user.uid).set({
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      phoneNumber: phoneNumber,
    });

    empty();
    setIsPosting(false);
    Alert.alert('Registered successfully');
    navigation.navigate('TabNav', {screen: 'HomeStack'});
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.miniContainer}>
        <Text
          style={{
            marginLeft: 10,
            fontWeight: '700',
            fontSize: 20,
            color: '#e65c00',
            marginBottom: 20,
          }}>
          Finish setting up your account
        </Text>

        <Text style={styles.lable}>First name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="e.g. Castro"
          style={styles.input}
        />

        <Text style={styles.lable}>Last name</Text>
        <TextInput
          onChangeText={setLastName}
          value={lastName}
          placeholder="e.g. Omondi"
          style={styles.input}
        />

        <Text style={styles.lable}>Phone number</Text>
        <TextInput
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="+254724753175"
          style={styles.input}
        />

        <TouchableOpacity onPress={validate} style={styles.button}>
          {isPosting ? (
            <ActivityIndicator color="gray" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniContainer: {
    width: width - 40,
    backgroundColor: '#e6f2ff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    marginHorizontal: 20,
  },

  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
    backgroundColor: '#330033',
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  lable: {
    fontWeight: '700',
    margin: 10,
    color: 'black',
  },
});
