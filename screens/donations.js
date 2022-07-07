import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Donations = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.coin}>
        <Text style={styles.descriptionText}>
          All the money received through donations is received by the church and
          used for the development of the church and the society around it.Note
          that your details are safe with us.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.donateButtons}
          onPress={() => navigation.navigate('MpesaDetails')}>
          <Image
            source={require('../assets/mpesa.png')}
            style={styles.mpesaImage}
          />
          <Text style={styles.buttonText}>Pay via M-Pesa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.donateButtons}
          //   onPress={() => {
          //     Linking.openURL(
          //       "https://www.paypal.com/donate/?hosted_button_id=ZUWPD83MZWEZ4"
          //     );
          //   }}
        >
          <Image
            source={require('../assets/visa.png')}
            style={styles.visaImage}
          />
          <Text style={styles.buttonText}>Pay via VISA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.donateButtons}
          //   onPress={() => {
          //     Linking.openURL(
          //       "https://www.paypal.com/donate/?hosted_button_id=ZUWPD83MZWEZ4"
          //     );
          //   }}
        >
          <Image
            source={require('../assets/paypal.png')}
            style={styles.mpesaImage}
          />
          <Text style={styles.buttonText}>Pay via PayPal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Donations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    marginHorizontal: 20,
  },
  donateButtons: {
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
    marginBottom: 10,
  },
  mpesaImage: {
    width: 80,
    height: 30,
  },
  visaImage: {
    width: 90,
    height: 30,
  },
  buttonText: {
    fontWeight: '700',
    color: 'black',
  },
  coin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  descriptionText: {
    fontWeight: '500',
    marginLeft: 20,
    color: 'black',
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
    width: 180,
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
    color: 'black',
    marginLeft: 10,
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
});
