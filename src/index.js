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
  yield takeEvery('SEARCH_GIFS', searchGifs);
  yield takeEvery('ADD_FAVORITE', postGifs);
  yield takeEvery('GET_FAVORITES', getFavoriteGifs);
  yield takeEvery('POST_FAVORITES', favoriteGifs);
  yield takeEvery('POST_CATEGORY', changeCategory);
  yield takeEvery('POST_GIF', setCategory);
  yield takeEvery('GET_CATEGORIES', categoryGifs);
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
    console.log('action payload in put is', action.payload)
    yield axios.post('/api/favorite', newGiphy);
    yield put({
      type: 'SET_FAVS'
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

//categoryReducer
const categoryReducer = ( state = [], action ) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.payload;
    default:
      return state;
  }
}

// SAGAS
// saga to get favoriteGifs
function* getFavoriteGifs() {
  try {
    const response = yield axios.get('/api/favorite');
    yield put({
      type: 'SET_FAVS',
      payload: response.data
    })
  }
  catch (err) {
    console.log('Error getting favorite Gifs', err)
  }
}

// saga to post favoriteGifs
function* favoriteGifs(action) {
  try {
    yield axios.post('/api/favorite', action.payload)
    yield put({
      type: 'GET_FAVORITE'
    })
  }
  catch (err) {
    console.log('Error posting gifs', err)
  }
}

// saga to put gifs
function* setCategory(action) {
  try {
    const gifId = action.payload.id;
    const categoryId = action.payload.categoryId;
    yield axios.put(`/api/favorite/${gifId}`, { categoryId });
    yield put({ 
      type: 'GET_FAVORITES' 
    });
  } catch (err) {
    console.log('Error changing category', err);
  }
}

// saga to get favorite Gifs from DB
function* categoryGifs() {
  try {
    const response = yield axios.get('/api/category');
    yield put({
      type: 'SET_CATEGORY',
      payload: response.data
    })
  }
  catch (err) {
    console.log('Error getting gifs from DB', err)
  }
}

function* changeCategory(action) {
  try {
    const newCategory = action.payload;
    yield axios.post('/api/category', { newCategoryName: newCategory });
    yield put({ 
      type: 'GET_CATEGORIES' 
    });
  } catch (err) {
    console.log('error in changeCategory', err);
  }
} //end changeCategory


const storeInstance = createStore(
  combineReducers({
    gifsSearch,
    gifsFavs,
    categoryReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);


ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,

document.getElementById('root'));
