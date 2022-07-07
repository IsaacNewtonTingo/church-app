import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import dateFormat from 'dateformat';
import LoadingScreen from '../components/loadingScreen';

const Programs = ({navigation}) => {
  const [programList, setProgramList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Programs')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const program = [];

        querySnapshot.forEach(documentSnapshot => {
          program.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setProgramList(program);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={programList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProgramDetails', {
                itemId: item.key,
              })
            }
            style={styles.announcementContainer}
            key={item.id}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
                textAlign: 'right',
              }}>
              {item.program}
            </Text>

            <Text
              style={{
                fontSize: 8,
                color: 'gray',
                fontWeight: '700',
                textAlign: 'right',
              }}>
              {dateFormat(item.createdAt, 'fullDate')}
              {'\n'}
              {dateFormat(item.createdAt, 'shortTime')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Programs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  announcementContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
    backgroundColor: '#e6e6ff',
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: '700',
    marginBottom: 20,
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
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
