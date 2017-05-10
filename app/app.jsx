'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import {Route, Router} from 'react-router';
import axios from 'axios';
import history from 'app/history';

import AuthActions from 'app/actions/AuthActions';
import AuthStore from 'app/store/AuthStore';

import Login from 'Login';
import Dashboard from 'Dashboard';
import PageUsers from 'PageUsers';
import Page2 from 'Page2';
import Page3 from 'Page3';
import Page4 from 'Page4';
import Page5 from 'Page5';

// Try to connect user from local storage value
AuthActions.localLogin();

// Handle API request errors
axios.interceptors.response.use(response => {
  return response;
}, error => {
  return new Promise((resolve, reject) => {
    if (error.status === 401 && error.data.error_description === 'The access token provided has expired.') {
      AuthActions.refreshToken({initialRequest: error.config, resolve: resolve, reject: reject});
    } else if (error.status === 401 && error.statusText === 'Unauthorized') {
      AuthActions.logout();
    } else {
      reject(error);
    }
  });
});


const requireLogin = (nextState, replaceState) => {
  console.log(AuthStore.getState());

  if (AuthStore.getState().accessToken === null) {
    console.log('State of user accessToken is null.');
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
};

// load Foundation (using style and css loaders)
$(document).foundation();

// app css
require('style!css!sass!applicationStyles');

// router implementation
ReactDOM.render(
  <Router history={history}>
    <Route component={Dashboard} onEnter={requireLogin}>
      <Route path="/" component={PageUsers}/>
      <Route path="/page2" component={Page2}/>
      <Route path="/page3" component={Page3}/>
      <Route path="/page4" component={Page4}/>
      <Route path="/page5" component={Page5}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('app')
);
