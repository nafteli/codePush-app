import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import codePush from 'react-native-code-push';

let codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

codePush.allowRestart();
const App = () => {
  const [codePushStatus, setCodePushStatus] = useState('-1');

  useEffect(() => {
    updates();
  }, []);

  const updates = async () => {
    const remotePackage = await codePush.checkForUpdate('YGkbeuIBHVOwVcTQ9krMR4fQCtIGid_0');
      console.log('remotePackage', remotePackage);
  };

  const checkConnectionToLocalhost = async () => {
    try {
      codePush.sync(
        {
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        status => {
          console.log('codePush status:', status);
          setCodePushStatus(`${status}`);
        },
      );
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert(
        'Connection Error',
        'Could not connect to codePush server: ' + error,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Text>codePush status: {codePushStatus}</Text>
      <TouchableOpacity onPress={checkConnectionToLocalhost}>
        <Text>Check for updates</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default codePush(codePushOptions)(App);
