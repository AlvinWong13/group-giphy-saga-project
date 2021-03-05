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
function* watcherSaga() {
  console.log("yield takeEvery")
  yield takeEvery('SEARCH_GIFS', searchGifs)
} 

function* searchGifs(action) {
  console.log("fetch gifts", action);
  try{
    // yield axios.post('/api/search', action.payload);
    // option a `/api/search/text?q=${action.payload}`
    //post payload to DB, assign var to response from DB/Server
    //then use yield put(.then equivalent) to run a 'get' function

    const response = yield axios.get(`/api/search/text?q=${action.payload.search}`);
    yield put({
      type: 'SET_GIFS',
      payload: response.data
    })
  }
  catch(err) {
    console.log("post failed", err);
  }
}

function* postGifs(action) {
  try{
    const newGiphy = action.payload;
    yield axios.post('/api/favorite', newGiphy);
    yield put({
      type: 'SET_FAVORITES'
    })
  }
  catch (err) {
    console.log('Error in posting gifs', err);
  }
}


const gifsSearch = (state = [], action) => {
  switch (action.type) {
    case 'SET_GIFS':
      return action.payload;
    default:
      return state;
  }
};//nonsense commment
const gifsFavs = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVS':
      return action.payload;
    default:
      return state;
  }
};
// Put that star function thing here to get gifs


const storeInstance = createStore(
  combineReducers({
    gifsSearch,
    gifsFavs
    // reducers here
  }),

  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);
ReactDOM.render(<Provider store={storeInstance}>
      <App />
    </Provider>,
document.getElementById('root'));
