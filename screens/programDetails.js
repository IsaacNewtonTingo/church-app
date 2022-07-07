import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const ProgramDetails = ({route, navigation}) => {
  const [progDesc, setProgDesc] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [program, setProgram] = useState(route.params.item);

  async function getData() {
    try {
      const subscriber = await firestore()
        .collection('Programs')
        .doc(route.params.itemId)
        .onSnapshot(documentSnapshot => {
          const docData = documentSnapshot.data();

          if (!docData) {
            navigation.navigate('AddedPrograms');
          } else {
            setProgram(docData.program);
            setProgDesc(docData.progDesc);
            setWhatsApp(docData.whatsApp);
          }
        });
      return () => subscriber();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const openWhatsApp = () => {
    Linking.openURL(whatsApp);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{marginTop: 20, paddingHorizontal: 10}}>
        <Text style={styles.title}>Title</Text>

        <Text style={styles.ann}>{program}</Text>

        <Text style={styles.title}>Description</Text>

        <Text style={styles.ann}>{progDesc}</Text>

        <TouchableOpacity onPress={openWhatsApp} style={styles.signUpButton}>
          <Text style={styles.buttonText}>Join WhatsApp group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProgramDetails;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    marginLeft: 10,
    color: '#e65c00',
  },
  ann: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
    marginLeft: 10,
    color: 'black',
  },

  signUpButton: {
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
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
