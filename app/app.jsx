import React from 'react';
import ReactDOM  from 'react-dom';
import {Route, Router} from 'react-router';
import axios from 'axios';
import history from 'app/history';
import AuthActions from 'app/actions/AuthActions';
import AuthStore from 'app/stores/AuthStore';
import Wrapper from 'app/components/Wrapper';
import Login from 'app/components/pages/Login';
import People from 'app/components/pages/People';
import ManageUserTypes from 'app/components/tabs/Users/Tab2';
import Meetings from 'app/components/pages/Meetings';
import Domains from 'app/components/pages/Domains';

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
      <Route path="/" component={People}/>
      <Route path="/ManageUserTypes" component={ManageUserTypes}/>
      <Route path="/Meetings" component={Meetings}/>
      <Route path="/Domains" component={Domains}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('app')
);
