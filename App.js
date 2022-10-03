/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Config from 'react-native-config';

const App = () => {
  const initSmartlook = useCallback(() => {
    if (isProd) {
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
    }
  }, [isProd]);

  useEffect(() => {
    initSmartlook();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {flex: 1, backgroundColor: '#00f'},
});

export default App;
