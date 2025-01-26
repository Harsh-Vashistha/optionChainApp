import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';
// import { ReactScan } from 'react-scan/native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { OptionChainDataProvider } from './store/OptionChainContext';
import OptionChainContainer from './src/containers/OptionChainContainer';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <ReactScan
        options={{
          enabled: true,
          log: true,
        }}
      > */}
      <OptionChainDataProvider>
        <OptionChainContainer />
      </OptionChainDataProvider>
      {/* </ReactScan> */}
    </SafeAreaView>
  );
}

export default App;
