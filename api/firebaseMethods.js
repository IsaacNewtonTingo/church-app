import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';

const user = await firestore().collection('Users').doc('ABC').get();

export async function getName() {
  const [name, setName] = useState('');
  try {
    const mySnapshot = await getDoc(
      doc(firestore, 'users', 'Q0E9fUAKuX1QP4rUjB86'),
    );
    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();
      setName(docData.firstName);
    }
  } catch (error) {
    console.log(error);
  }
}
