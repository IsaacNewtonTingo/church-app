import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var loggedInUser = auth().currentUser;
    getData(loggedInUser);
  }, [navigation, loading]);

  function onResult(QuerySnapshot) {
    const docData = QuerySnapshot.data();

    if (docData) {
      setFirstName(docData.firstName);
      setLastName(docData.lastName);
      setPhoneNumber(docData.phoneNumber);
    } else {
      return () => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
      };
    }

    navigation.addListener('focus', () => setLoading(!loading));
  }

  function onError(error) {
    console.log(error);
  }

  async function getData(loggedInUser) {
    const uid = loggedInUser.uid;
    const userEmail = loggedInUser.email;

    setEmail(userEmail);

    const subscriber = await firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(onResult, onError);
    return subscriber;
  }

  async function signOut() {
    await auth()
      .signOut()
      .then(() => {
        console.log('Signed out successfully');
      });
  }

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 40, marginHorizontal: 20}}>
        <View>
          <View style={styles.items}>
            <Text style={styles.text}>First name</Text>
            <Text style={styles.text}> {firstName}</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.text}>Last name</Text>
            <Text style={styles.text}> {lastName}</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.text}> Email</Text>
            <Text style={styles.text}>{email} </Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.text}>Phone number</Text>
            <Text style={styles.text}>{phoneNumber}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#ff6600'}]}
            onPress={() => signOut()}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontWeight: 'bold',
  },

  items: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 5, width: 5},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 10,
    backgroundColor: '#e6e6ff',
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d004d',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 15,
    shadowOpacity: 0.3,
    marginTop: 20,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
