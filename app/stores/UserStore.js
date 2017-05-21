import axios from 'axios';
import update from 'immutability-helper';
import alt from 'alt';
import UserActions from 'actions/UserActions';
import Config from 'config';
import shortid from 'shortid';
import {getMySQLTimestamp} from 'helpers.js';
//const data = require('json!components/tabs/Users/data.json');


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
      email: rows[index].email,
      notes: rows[index].notes,
      password: rows[index].password,
      user_type_id: rows[index].user_type_id
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

      this.setState({
        users: update(users, {$splice: [[index, 1]]}),
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

    // user fields to insert
    const fields = {
      name: 'New User ',
      email: 'new.user' + shortid.generate() + '@clearlink.com',
      password: 'secret',
      notes: 'Enter notes here...',
      user_type_id: 1,
      created_at: getMySQLTimestamp(),
      updated_at: getMySQLTimestamp()
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

      //console.log('API insert success (last insert id):', response.data.last_insert_id);

      const updatedFields = {
        id: response.data.last_insert_id,
        ...fields
      };

      this.setState({
        users: update([...users], {$splice: [[index, 0, updatedFields]]}),
        error: null
      });

    }).catch(response => {
      return console.log('API insert error: ', response);
    });
  }




} // end class

export default alt.createStore(UserStore, 'UserStore');
