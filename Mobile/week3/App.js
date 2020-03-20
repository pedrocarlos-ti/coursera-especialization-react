import React from 'react';
import Main from './components/MainComponent';
import Loading from './components/LoadingComponent';

console.disableYellowBox = true;

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={Loading} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
