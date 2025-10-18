import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '@/navigation/AppNavigator.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CAlertProvider from '@/components/common/CAlert';
import { Provider } from 'react-redux';
import { store, persistor } from '@/stores/store.ts';
import InjectedConfig from '@/components/utilities/InjectedConfig';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            {isReady && <AppNavigation />}
            <CAlertProvider />
            <InjectedConfig onReadyToUse={setIsReady.bind(this, true)} />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
