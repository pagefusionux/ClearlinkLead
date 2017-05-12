import React from 'react';
import ReactDOM  from 'react-dom';
import {Route, Router} from 'react-router';
import axios from 'axios';
import history from 'app/history';
import AuthActions from 'app/actions/AuthActions';
import AuthStore from 'app/stores/AuthStore';
import Wrapper from 'app/components/Wrapper';
import Login from 'app/components/pages/Login';
import Users from 'app/components/pages/Users';
import Page2 from 'app/components/pages/Page2';
import Page3 from 'app/components/pages/Page3';
import Page4 from 'app/components/pages/Page4';
import Page5 from 'app/components/pages/Page5';

// try to get user info from local storage value
AuthActions.localLogin();

// handle API requests involving rejected tokens
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

// handle routes requiring login
const requireLogin = (nextState, replaceState) => {
  console.log(AuthStore.getState());

  if (AuthStore.getState().accessToken === null) {
    console.log('State of user accessToken is null.');
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
};

// load Foundation
$(document).foundation();

// load base app css
require('style!css!sass!app/styles/app.scss');

// router implementation
ReactDOM.render(
  <Router history={history}>
    <Route component={Wrapper} onEnter={requireLogin}>
      <Route path="/" component={Users}/>
      <Route path="/page2" component={Page2}/>
      <Route path="/page3" component={Page3}/>
      <Route path="/page4" component={Page4}/>
      <Route path="/page5" component={Page5}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('app')
);
