import axios from 'axios';
import update from 'immutability-helper';
import alt from 'app/alt';
import UserActions from 'app/actions/UserActions';
const data = require('json!app/components/tabs/Users/data.json');


class UserStore {
  constructor() {
    this.bindActions(UserActions);

    // state
    this.users = [];
    this.expanded = {};
    this.error = null;
  }

  getUsers() {
    axios
    .get("http://localhost.lumenoauth/users")
    .then(response => {
      console.log("getAll(): ", response.data.data);

      setTimeout(() => { // simulate network latency
        this.setState({
          users: data.data,
          expanded: {},
          error: null
        });
      }, 500);

    }).catch(response => {
      this.setState({ users: null, expanded: null, error: response});
    });
  }

  // update entire users array
  putUsers({fromRow, toRow, updated, users}) {

    let rows = users.slice();
    let updatedRow = [];
    let rowToUpdate = [];
    let fields = {};

    for (let i = fromRow; i <= toRow; i++) {
      rowToUpdate = rows[i];
      updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;

      const accessToken = localStorage.getItem('access_token');

      // user fields to update
      fields = {
        id: rows[i].id,
        name: rows[i].name,
        email: rows[i].email,
        _method: 'PUT'
      };

      // set axios auth header
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          //'Content-Type': 'application/x-www-form-urlencoded'
          //'Content-Type': 'multipart/form-data'
          'Content-Type': 'application/json'
        }
      };

      // update row in users table
      axios
      .put(`http://localhost.lumenoauth/users/${fields.id}`, fields, config)
      .then(response => {
        console.log("API success:", response);
      }).catch(response => {
        return console.log("API error: ", response);
      });

      //console.log(`UserStore.js: Updated rows[${i}]:`, rows[i]);
    }

    this.setState({
      users: rows,
      expanded: {},
      error: null
    });

  }

  // expand rows
  expandRows({users, expanded, error}) {
    this.setState({
      users,
      expanded,
      error: null
    });
  }

}

export default alt.createStore(UserStore, 'UserStore');
