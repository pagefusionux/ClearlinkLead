import React, {Component} from 'react';

import AuthStore from 'app/store/AuthStore';
import AuthActions from 'app/actions/AuthActions';
import connectToStores from 'alt/utils/connectToStores';

import Nav from 'Nav';

export class Dashboard extends Component {
  static getStores() {
    return [AuthStore];
  }
  static getPropsFromStores() {
    return AuthStore.getState();
  }
  onClickLogout() {
    AuthActions.logout();
  }
  render () {
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}

export default connectToStores(Dashboard);
