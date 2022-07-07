import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var {width} = Dimensions.get('window');

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isPosting, setIsPosting] = useState(false);

  const validate = () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      Alert.alert('All field are required');
    } else if (password != confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (password.length < 8) {
      Alert.alert('Password is too short');
    } else {
      setIsPosting(true);
      handleSignUp();
    }
  };

  const empty = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  const handleSignUp = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        firestore().collection('Users').doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          phoneNumber: phoneNumber,
        });

        setIsPosting(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email address already in use');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email adress');
        }

        empty();
        console.error(error);
        setIsPosting(false);
      })
      .finally(() => {
        Alert.alert('Account created successfully');
        setIsPosting(false);
        empty();
        navigation.navigate('TabNav');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.miniContainer}>
        <Text style={styles.lable}>First name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="e.g. Castro"
          style={styles.input}
          placeholderTextColor="gray"
        />

        <Text style={styles.lable}>Last name</Text>
        <TextInput
          onChangeText={setLastName}
          value={lastName}
          placeholder="e.g. Omondi"
          style={styles.input}
          placeholderTextColor="gray"
        />

        <Text style={styles.lable}>Phone number</Text>
        <TextInput
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="+254724753175"
          style={styles.input}
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />

        <Text style={styles.lable}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. herod@gmail.com"
          style={styles.input}
          placeholderTextColor="gray"
          keyboardType="email-address"
        />

        <Text style={styles.lable}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="********"
          style={styles.input}
          placeholderTextColor="gray"
          secureTextEntry={true}
        />

        <Text style={styles.lable}>Confirm passsword</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="********"
          style={styles.input}
          placeholderTextColor="gray"
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={validate} style={styles.button}>
          {isPosting ? (
            <ActivityIndicator color="gray" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              textAlign: 'center',
              color: 'blue',
              fontWeight: '700',
            }}>
            Already have an account? Login
          </Text>
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
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    marginHorizontal: 20,
    paddingVertical: 20,
  },

  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  button: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
    backgroundColor: '#330033',
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
