/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import Config from 'react-native-config';
import Smartlook from 'smartlook-react-native-wrapper';

const App = () => {
  const initSmartlook = useCallback(() => {
    Smartlook.setupAndStartRecording(Config.SMART_LOOK_KEY);
    Smartlook.registerIntegrationListener(
      async function (dashboardSessionUrl) {
        await Promise.all([
          crashlytics().setAttribute(
            'dashboardSessionUrl',
            dashboardSessionUrl,
          ),
        ]);
      },
      async function (dashboardVisitorUrl) {
        await Promise.all([
          crashlytics().setAttribute(
            'dashboardVisitorUrl',
            dashboardVisitorUrl,
          ),
        ]);
      },
    );
  }, []);

  useEffect(() => {
    initSmartlook();
  }, []);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {flex: 1, backgroundColor: '#00f'},
});

export default App;
