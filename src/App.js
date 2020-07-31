import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  const onAuthStateChanged = (currentUser) => {
    setUser(currentUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  const onPressLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onPressAnonymousLogin = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Login Screen</Text>
        <Button title={'LOGIN ANONYMOUSLY'} onPress={onPressAnonymousLogin} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome {user.email || 'Anonymous'}</Text>
      <Button title={'LOGOUT'} onPress={onPressLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
