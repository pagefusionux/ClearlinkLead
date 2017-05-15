import axios from 'axios';
import alt from 'app/alt';
import update from 'immutability-helper';
import UserTypesActions from 'app/actions/UserTypesActions';
import Config from 'app/config';
import {getMySQLTimestamp} from 'app/helpers.js';

class UserTypesStore {
  constructor() {
    this.bindActions(UserTypesActions);

    // state
    this.userTypes = [];
    this.error = null;
  }

  getUserTypes() {
    axios
    .get(`${Config.apiUrl}/userTypes`)
    .then(response => {
      console.log("getUserTypes(): ", response.data.data);

      //setTimeout(() => { // simulate network latency
        this.setState({
          userTypes: response.data.data,
          error: null
        });
      //}, 500);

    }).catch(response => {
      this.setState({
        userTypes: null,
        error: response
      });
    });
  }


  // update entire userTypes array (new table)
  updateUserTypes({index, updated, userTypes}) {

    let rows = userTypes.slice();
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
      title: rows[index].title
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
    .put(`${Config.apiUrl}/userTypes/${fields.id}`, fields, config)
    .then(response => {
      console.log("API update success:", response);
    }).catch(response => {
      return console.log("API update error: ", response);
    });

    this.setState({
      userTypes: rows,
      error: null
    });
  }


  // delete userType
  deleteUserType({index, userTypes}) {

    // get userType id
    const userTypeId = userTypes[index].id;

    const accessToken = localStorage.getItem('access_token');

    // set axios auth header
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };

    // delete row in users table
    axios
    .delete(`${Config.apiUrl}/userTypes/${userTypeId}`, config)
    .then(response => {
      //console.log("API Delete success:", response);

      this.setState({
        userTypes: update(userTypes, {$splice: [[index, 1]]}),
        error: null
      });

    }).catch(response => {
      return console.log("API delete error: ", response);
    });
  }

  // insert user type
  insertUserType({index, userTypes}) {

    // get access token
    const accessToken = localStorage.getItem('access_token');

    // fields to update
    const fields = {
      title: 'New Type',
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

    // insert row in user_types table
    axios
    .post(`${Config.apiUrl}/userTypes`, fields, config)
    .then(response => {

      console.log('API insert success (last insert id):', response.data);

      const updatedFields = {
        id: response.data.last_insert_id,
        ...fields
      };

      const newUserTypes = update([...userTypes], {$splice: [[index, 0, updatedFields]]});

      //console.log("newUserTypes:",newUserTypes);

      this.setState({
        userTypes: newUserTypes,
        error: null
      });

    }).catch(response => {
      return console.log('API insert error: ', response);
    });
  }




} // end class

export default alt.createStore(UserTypesStore, 'UserTypesStore');
