import axios from 'axios';
import Uri from 'jsuri';

import alt from 'app/alt';
import UserActions from 'app/actions/UserActions';
import InterceptorUtil from 'app/utils/InterceptorUtil';
import Config from 'app/config';
import history from 'app/history';

class UserStore {
  constructor() {
    this.bindActions(UserActions);

    // State
    this.users = null;

  }

  viewAll() {

    return users;
  }
}

export default alt.createStore(UserStore, 'UserStore');
