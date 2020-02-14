import React from 'react';
import Main from './components/MainComponent';
console.disableYellowBox = true;

import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
