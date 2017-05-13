import axios from 'axios';
import update from 'immutability-helper';
import alt from 'app/alt';
import UserActions from 'app/actions/UserActions';
import Config from 'app/config';
//const data = require('json!app/components/tabs/Users/data.json');


class UserStore {
  constructor() {
    this.bindActions(UserActions);

    // state
    this.users = [];
    this.error = null;
  }

  getUsers() {
    axios
    .get(`${Config.apiUrl}/users`)
    .then(response => {
      console.log("getAll(): ", response.data.data);

      setTimeout(() => { // simulate network latency
        this.setState({
          users: response.data.data,
          error: null
        });
      }, 500);

    }).catch(response => {
      this.setState({
        users: null,
        error: response
      });
    });
  }


  // update entire users array (new table)
  updateUsers({index, updated, users}) {

    let rows = users.slice();
    let updatedRow = [];
    let rowToUpdate = [];
    let fields = {};

    rowToUpdate = rows[index];
    updatedRow = update(rowToUpdate, {$merge: updated});
    rows[index] = updatedRow;

    //console.log('updatedRow:', rows[index]);

    const accessToken = localStorage.getItem('access_token');

    // user fields to send via API
    fields = {
      id: rows[index].id,
      name: rows[index].name,
      email: rows[index].email
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
    .put(`${Config.apiUrl}/users/${fields.id}`, fields, config)
    .then(response => {
      console.log("API update success:", response);
    }).catch(response => {
      return console.log("API update error: ", response);
    });

    //console.log(`UserStore.js: Updated rows[${index}]:`, rows[index]);

    this.setState({
      users: rows,
      error: null
    });
  }


  // delete user
  deleteUser({index, users}) {

    // get user id
    const userId = users[index].id;

    const accessToken = localStorage.getItem('access_token');

    // set axios auth header
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };

    // delete row in users table
    axios
    .delete(`${Config.apiUrl}/users/${userId}`, config)
    .then(response => {
      console.log("API Delete success:", response);

      users.splice(index, 1);

      this.setState({
        users,
        error: null
      });

    }).catch(response => {
      return console.log("API delete error: ", response);
    });
  }

  // insert user
  insertUser({index, users}) {

    // get access token
    const accessToken = localStorage.getItem('access_token');

    const newNum = index + 1;

    // user fields to update
    const fields = {
      name: 'New User ' + newNum,
      email: 'new.user' + newNum + '@clearlink.com',
      password: 'secret'
    };

    // set axios auth header
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
        //'Content-Type': 'application/x-www-form-urlencoded'
        //'Content-Type': 'multipart/form-data'
        //'Content-Type': 'application/json'
      }
    };

    // insert row in users table
    axios
    .post(`${Config.apiUrl}/users`, fields, config)
    .then(response => {

      console.log('API insert success (last insert id):', response.data.last_insert_id);

      const updatedFields = {
        id: response.data.last_insert_id,
        ...fields
      };

      let rows = [...users];
      rows.splice(index, 0, updatedFields);

      this.setState({
        users: rows,
        error: null
      });

    }).catch(response => {
      return console.log('API insert error: ', response);
    });
  }




} // end class

export default alt.createStore(UserStore, 'UserStore');
