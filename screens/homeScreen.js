import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import LoadingScreen from '../components/loadingScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstReadingScripture, setfirstReadingScripture] = useState('');
  const [firstReadingSaying, setFirstReadingSaying] = useState('');
  const [secondReadingScripture, setSecondReadingSripture] = useState('');
  const [secondReadingSaying, setSecondReadingSaying] = useState('');
  const [thirdReadingScripture, setThirdReadingScripture] = useState('');
  const [thirdReadingSaying, setThirdReadingSaying] = useState('');
  const [prayer, setPrayer] = useState('');

  const [loading, setLoading] = useState(true);

  const getReadings = async () => {
    try {
      const subscriber = await firestore()
        .collection('Todays_Reading')
        .doc('Readings')
        .onSnapshot(documentSnapshot => {
          const docData = documentSnapshot.data();

          if (docData) {
            setfirstReadingScripture(docData.firstReadingScripture);
            setFirstReadingSaying(docData.firstReadingSaying);
            setSecondReadingSripture(docData.secondReadingScripture);
            setSecondReadingSaying(docData.secondReadingSaying);
            setThirdReadingScripture(docData.thirdReadingScripture);
            setThirdReadingSaying(docData.thirdReadingSaying);

            setLoading(false);
          } else {
            return () => {
              setCurrentDate('');
              setLastName('');
              setfirstReadingScripture('');
              setFirstReadingSaying('');
              setSecondReadingSripture('');
              setSecondReadingSaying('');
              setThirdReadingScripture('');
              setThirdReadingSaying('');
              setPrayer('');
              setLoading();
            };
          }
        });
      return () => {
        subscriber();
        setLoading();
      };
    } catch (error) {
      console.log(error);
    }
  };

  async function getPrayer() {
    try {
      const subscriber = await firestore()
        .collection('Prayers')
        .doc('Todays_Prayer')
        .onSnapshot(documentSnapshot => {
          const docData = documentSnapshot.data();

          if (docData) {
            setPrayer(docData.prayer);
            setLoading(false);
          } else {
            return setPrayer('');
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    var loggedInUser = auth().currentUser;
    getData(loggedInUser);
  }, []);

  function onResult(QuerySnapshot) {
    const docData = QuerySnapshot.data();

    if (docData) {
      setLastName(docData.lastName);
    } else {
      return setLastName('');
    }
  }

  function onError(error) {
    console.log(error);
  }

  async function getData(loggedInUser) {
    const uid = loggedInUser.uid;

    const subscriber = await firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(onResult, onError);
    return subscriber;
  }

  useEffect(() => {
    getReadings();
    getPrayer();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setCurrentDate(date + '/' + month + '/' + year + ' ');
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/displayImage.jpg')}
        style={styles.displayImage}
      />

      <View style={styles.helloContainer}>
        <View style={styles.churchIcon}>
          <Text style={styles.helloText}>Hello {lastName}, Welcome to</Text>
        </View>
        <View style={styles.churchIcon}>
          <Text style={styles.stPetersText}>St. Peters' Diocese, Roysambu</Text>
        </View>
      </View>

      <View style={styles.todaysReadingContainer}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.todaysReadingText, {marginRight: 20}]}>
              Today's reading
            </Text>
          </View>
          <Text style={{marginBottom: 20, color: '#660066', letterSpacing: 3}}>
            --- {currentDate}---
          </Text>
        </View>
      </View>

      <View style={styles.secondReadingContainer}>
        <Text style={styles.scripture}>
          First reading: {firstReadingScripture}
        </Text>
        <Text style={styles.verseText}>{firstReadingSaying}</Text>
      </View>

      <View style={styles.secondReadingContainer}>
        <Text style={styles.scripture}>
          Second reading: {secondReadingScripture}
        </Text>
        <Text style={styles.verseText}>{secondReadingSaying}</Text>
      </View>

      <View style={styles.secondReadingContainer}>
        <Text style={styles.scripture}>
          Third reading: {thirdReadingScripture}
        </Text>
        <Text style={styles.verseText}>{thirdReadingSaying}</Text>
      </View>

      <View style={{margin: 20}}>
        <Text style={styles.todaysReadingText}>Prayer for the day</Text>
        <Text style={styles.verseText}>{prayer}</Text>
      </View>

      <Text style={[styles.todaysReadingText, {margin: 20}]}>
        Motivational video
      </Text>

      <TouchableOpacity
        style={styles.announcementContainer}
        onPress={() => navigation.navigate('Announcements')}>
        <Text
          style={
            ([styles.donationText],
            {position: 'absolute', top: 10, fontWeight: '700', color: 'black'})
          }>
          Click to view
        </Text>
        <Image
          source={require('../assets/announcement4.gif')}
          style={styles.announcementImage}
        />
      </TouchableOpacity>

      <View style={styles.offeringAndTitheContainer}>
        <TouchableOpacity
          style={styles.offeringContainer}
          onPress={() => navigation.navigate('MpesaDetails')}>
          <View style={styles.iconAndText}>
            <Text style={styles.offeringText}>Give offering</Text>
          </View>
          <Text style={styles.offeringDescText}>
            You can give your offering directly here. Make sure you have money
            in your MPesa for successful transaction.
          </Text>
          <Image
            source={require('../assets/lipaNaMPesa.png')}
            style={styles.lipaNaMPesa}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.offeringContainer}
          onPress={() => navigation.navigate('MpesaDetails')}>
          <View style={styles.iconAndText}>
            <Text style={styles.offeringText}>Give tithe</Text>
          </View>
          <Text style={styles.offeringDescText}>
            You can give your mothly tithe directly here. Make sure you have
            money in your MPesa for successful transaction.
          </Text>
          <Image
            source={require('../assets/lipaNaMPesa.png')}
            style={styles.lipaNaMPesa}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.donationContainer}
        onPress={() => navigation.navigate('Donations')}>
        <MaterialCommunityIcons name="hand-coin" size={30} color="black" />

        <Text style={styles.donationText}>Make a donation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  displayImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: '100%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },

  helloContainer: {
    height: 100,
    backgroundColor: '#e6f2ff',
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
    position: 'absolute',
    top: 340,
    width: '100%',
  },
  helloText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999999',
    marginLeft: 10,
  },

  stPetersText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
  },
  churchIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todaysReadingContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 60,
    width: '50%',
    alignItems: 'center',
    resizeMode: 'cover',
    marginBottom: 20,
  },
  todaysReadingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e65c00',
    marginBottom: 10,
  },
  playIcons: {
    marginRight: 10,
  },
  scripture: {
    color: '#999999',
  },
  verseText: {
    fontSize: 16,
    marginTop: 10,
    color: 'black',
  },
  bible: {
    height: 200,
    width: 200,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
    marginBottom: 40,
  },
  announcementContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: '#ffd9b3',
    marginTop: 20,
    marginBottom: 20,
  },
  announcementImage: {
    height: 150,
    width: 350,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.9,
  },
  offeringAndTitheContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  offeringContainer: {
    height: 220,
    backgroundColor: '#e6e6ff',
    width: '48%',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
  },
  offeringText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    color: 'black',
  },
  iconAndText: {
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  lipaNaMPesa: {
    width: 100,
    height: 50,
    shadowColor: 'white',
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 2,
    shadowOpacity: 0.9,
  },
  offeringDescText: {
    fontWeight: '500',
    color: 'black',
  },
  donationContainer: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
    backgroundColor: '#e6e6ff',
    marginBottom: 100,
    height: 100,
    padding: 10,
  },
  donationText: {
    fontWeight: '500',
    marginTop: 10,
    color: 'black',
  },
  secondReadingContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 200,
    marginBottom: 50,
  },
  location: {
    fontWeight: '700',
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 18,
    color: 'gray',
  },
  navigate: {
    height: 50,
    backgroundColor: '#262673',
    marginBottom: 200,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
