import React, { Component } from 'react';
import Griddle from 'griddle-react';

import UserStore from 'app/stores/UserStore';
import UserActions from 'app/actions/UserActions';
import connectToStores from 'alt/utils/connectToStores';

class Tab1 extends Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return {
      users: UserStore.getState().users,
      error: UserStore.getState().error
    }
  }

  componentWillMount() {
    UserActions.getUsers();
  }

  render() {

    // Tab 1 Output
    let output = '';

    // API error
    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }

    if (!this.props.users.length) {
      output = <div className="loading"><img src="images/loading.svg" /></div>;
    } else {

      output = (
        <Griddle data={this.props.users} />
      );
    }

    return output;
  }
}

export default connectToStores(Tab1);
