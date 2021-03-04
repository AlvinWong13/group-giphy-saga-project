import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

//categoryReducer
const categoryReducer = (state = [], action) => {
    if(action.type === 'SEND_CAT_TO_REDUCER') {
      return action.payload;
    }
    return state;
}

const storeInstance = createStore(
  combineReducers({
    categoryReducer,
    // reducers here
  }),

  applyMiddleware(sagaMiddleware, logger)
);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
document.getElementById('root'));