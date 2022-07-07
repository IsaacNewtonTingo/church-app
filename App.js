import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNav from './navigation/tabNav';
import AuthStack from './navigation/authStack';
import {LogBox} from 'react-native';

import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs([
  'Require cycles',
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
};

export default App;
