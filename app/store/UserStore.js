import axios from 'axios';
//import Uri from 'jsuri';

import alt from 'app/alt';
import UserActions from 'app/actions/UserActions';
//import InterceptorUtil from 'app/utils/InterceptorUtil';
//import Config from 'app/config';
//import history from 'app/history';

class UserStore {
  constructor() {
    this.bindActions(UserActions);

    // state
    this.users = [];
    this.error = null;
  }

  getUsers() {
    axios
    .get("http://localhost.lumenoauth/users")
    .then(response => {
      console.log("getAll(): ", response.data.data);

      setTimeout(() => {
        this.setState({
          users: response.data.data,
          error: null
        });
      }, 2000);

       //return response.data.data;
    }).catch(response => {
      //console.log("API query failed!");
      this.setState({ users: null, error: response});
    });
  }
}

export default alt.createStore(UserStore, 'UserStore');
