import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, persistCombineReducers } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '../reducers'
import rootSaga from '../sagas/index';

import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from "redux-offline-queue";

const persistConfig = {
  key: 'offline',
  storage: AsyncStorage,
  keyPrefix: '',
  whitelist: ["offline"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(...middlewares)
  )
)
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };