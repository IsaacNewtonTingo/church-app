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

var {width} = Dimensions.get('window');

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);

  const validate = () => {
    if (!email || !password) {
      Alert.alert('All field are required');
    } else {
      setIsPosting(true);
      handleLogin();
    }
  };

  const empty = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsPosting(false);
        console.log('Login successful');
        navigation.navigate('TabNav');
        empty();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        }
        if (error.code === 'auth/too-many-requests') {
          Alert.alert('Too many attempts', '\n', 'Try later');
        }

        setIsPosting(false);
        console.error(error);
        empty();
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={{
          width: 100,
          height: 100,
          // position: 'absolute',
          zIndex: 1,
          top: 0,
        }}
        source={require('../assets/newChurch.png')}
      />

      <View style={styles.miniContainer}>
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

        <TouchableOpacity onPress={validate} style={styles.button}>
          {isPosting ? (
            <ActivityIndicator color="gray" size="small" animating />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 50,
              color: 'blue',
              fontWeight: '700',
            }}>
            Already have an account? Signup
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
    paddingTop: 40,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },

  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
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
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
