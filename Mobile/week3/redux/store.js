import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { favorites } from './favorites';

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
};

export const store = createStore(
  persistCombineReducers(config, {
    dishes,
    comments,
    promotions,
    leaders,
    favorites
  }),
  applyMiddleware(thunk, logger)
);

export const persistor = persistStore(store);
