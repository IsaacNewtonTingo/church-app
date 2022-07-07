import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {FontAwesome5} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

const MpesaDetails = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inerContainer}>
        <Text style={styles.heading}>
          Follow the following instructions to make a payment :
        </Text>
        <Text style={styles.steps}>1. Go to M-Pesa app on your phone</Text>
        <Text style={styles.steps}>2. Select lipa na M-Pesa</Text>
        <Text style={styles.steps}>3. Select Paybill</Text>
        <Text style={styles.steps}>4. Enter business number " 445669 "</Text>
        <Text style={styles.steps}>
          5. Enter business account number " church "
        </Text>
        <Text style={styles.steps}>
          6. Enter the amount and complete the transaction
        </Text>
      </View>
    </ScrollView>
  );
};

export default MpesaDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inerContainer: {},
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: 'black',
  },
  steps: {
    fontSize: 16,
    color: 'black',
  },
});
