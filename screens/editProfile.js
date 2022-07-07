import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUserId] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    var loggedInUser = auth().currentUser;
    getData(loggedInUser);
  }, [uid]);

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

    return docData;
  }

  function onError(error) {
    console.log(error);
  }

  async function getData(loggedInUser) {
    const uid = loggedInUser.uid;
    setUserId(uid);
    const userEmail = loggedInUser.email;
    setEmail(userEmail);

    const subscriber = await firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(onResult, onError);
    return subscriber;
  }

  async function reauthenticate(currentPassword) {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  async function changeEmailInDB() {
    await firestore().collection('Users').doc(uid).update({
      email: email,
    });
    setIsPosting(false);
  }

  async function updateEmail() {
    reauthenticate(password)
      .then(async () => {
        await auth()
          .currentUser.updateEmail(email)
          .then(function () {
            changeEmailInDB(email);

            setIsPosting(false);
            setPassword('');
          })
          .catch(error => {
            Alert.alert(error.message);
            setIsPosting(false);
          })
          .finally(() => {
            Alert.alert('Profile updated successfully');
          });
        return updateEmail;
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        } else {
          Alert.alert(error.message);
        }

        setIsPosting(false);
      });
  }

  async function editProfile() {
    if (!password) {
      Alert.alert('Must enter password');
    } else {
      setIsPosting(true);
      reauthenticate(password)
        .then(async () => {
          const update = await firestore().collection('Users').doc(uid).update({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
          });
          updateEmail();
          return update;
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong password');
          } else {
            Alert.alert(error.message);
          }
        })
        .finally(() => {
          setIsPosting(false);
        });
    }
  }

  async function handleDelete() {
    if (!password) {
      Alert.alert('Password is required');
    } else {
      setIsDeleting(true);
      reauthenticate(password)
        .then(async () => {
          await auth().currentUser.delete();
          await firestore().collection('Users').doc(uid).delete();
          setIsDeleting(false);
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong password');
          } else {
            Alert.alert(error.message);
          }

          console.log(error.message);
          setIsDeleting(false);
        })
        .finally(() => {
          Alert.alert('Account deleted successfully');
          setIsDeleting(false);
          return null;
        });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 20}}>
        <Text style={styles.text}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g Alex"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          placeholderTextColor="gray"
        />
        <Text style={styles.text}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g Ogard"
          value={lastName}
          placeholderTextColor="gray"
          onChangeText={text => setLastName(text)}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g ogardalex@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor="gray"
          keyboardType="email-address"
        />

        <Text style={styles.text}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g +254744568790"
          value={phoneNumber}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholderTextColor="gray"
          onChangeText={text => setPhoneNumber(text)}
        />

        <Text style={styles.text}>Current password</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          value={password}
          secureTextEntry={true}
          placeholderTextColor="gray"
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={editProfile}>
          {isPosting ? (
            <ActivityIndicator color="gray" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Edit profile</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.button, {backgroundColor: '#ff6600'}]}>
          {isDeleting ? (
            <ActivityIndicator color="gray" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Delete account</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 5, width: 5},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 10,
    backgroundColor: '#e6e6ff',
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    color: 'black',
  },
  text: {
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
    color: 'black',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d004d',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
