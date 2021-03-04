import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

// GET ROUTE REDUCER FOR GIF Search
const GifsSearch = (state = [], action) => {
  switch (action.type) {
    case 'SET_GIFS':
      return action.payload;
    default:
      return state;
  }
};//nonsense commment
const GifsFavs = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVS':
      return action.payload;
    default:
      return state;
  }
};
// Put that star function thing here to get gifs

function* watcherSaga() {
  console.log("yield takeEvery")
} 

const storeInstance = createStore(
  combineReducers({
    // reducers here
  }),

  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);
ReactDOM.render(<App />, document.getElementById('root'));
