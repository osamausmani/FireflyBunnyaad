import React, { useState, useEffect, useContext } from 'react';
import { StatusBar, LogBox, SafeAreaView } from 'react-native';
import Navigation from './src/navigation/Navigation';
import AppProvider from './src/contextApi/AppProvider';


const App = () => {

  return (

    <AppProvider>
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar hidden />
          <Navigation />
        </SafeAreaView>

      </>
    </AppProvider>
  );
};

export default App;


LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
  "EventEmitter.removeListener"
])
LogBox.ignoreAllLogs(); 