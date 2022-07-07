import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const AnnouncementDetails = ({route, navigation}) => {
  const [announcementDescription, setAnnouncementDescription] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState(route.params.item);

  async function getData() {
    try {
      const subscriber = await firestore()
        .collection('Announcements')
        .doc(route.params.itemId)
        .onSnapshot(documentSnapshot => {
          const docData = documentSnapshot.data();

          if (!docData) {
            navigation.navigate('AddedAnnouncements');
          } else {
            setAnnouncementDescription(docData.announcementDescription);
            setAnnouncementTitle(docData.announcementTitle);
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

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{marginTop: 20, paddingHorizontal: 10}}>
        <Text style={styles.title}>Title</Text>

        <Text style={styles.ann}>{announcementTitle}</Text>

        <Text style={styles.title}>Description</Text>

        <Text style={styles.ann}>{announcementDescription}</Text>
      </View>
    </ScrollView>
  );
};

export default AnnouncementDetails;

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
});
