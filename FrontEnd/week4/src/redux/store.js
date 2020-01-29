import { createStore, applyMiddleware } from 'redux';
import { Reducers } from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = createStore(Reducers, applyMiddleware(thunk, logger));
