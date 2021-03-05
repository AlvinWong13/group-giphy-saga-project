import { HashRouter as Router, Route } from 'react-router-dom';
import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import FavoritesList from '../FavoritesList/FavoritesList';

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ff0000',
    },
  },
});

function App(props) {
  return (
      <Router>
        <ThemeProvider theme={outerTheme}>
          <Header />
          <Route path='/' exact >
            <SearchForm />
          </Route>
          <Route path='/favorites' >
            <FavoritesList />
          </Route>
        </ThemeProvider>
      </Router>
  );
}

export default App;
