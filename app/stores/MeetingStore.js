import axios from 'axios';
import alt from 'app/alt';
import update from 'immutability-helper';
import MeetingActions from 'app/actions/MeetingActions';
import Config from 'app/config';
import {getMySQLTimestamp} from 'app/helpers.js';

class MeetingStore {
  constructor() {
    this.bindActions(MeetingActions);

    // state
    this.meetings = [];
    this.error = null;
  }

  getMeetings() {
    axios
    .get(`${Config.apiUrl}/meetings`)
    .then(response => {
      console.log("getMeetings(): ", response.data.data);

      //setTimeout(() => { // simulate network latency
        this.setState({
          meetings: response.data.data,
          error: null
        });
      //}, 500);

    }).catch(response => {
      this.setState({
        meetings: null,
        error: response
      });
    });
  }


  // update entire array (new table)
  updateMeetings({index, updated, meetings}) {

    let rows = meetings.slice();
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
      title: rows[index].title,
      type: rows[index].type,
      notes: rows[index].notes,
      held_on: rows[index].held_on
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

    // update row in table
    axios
    .put(`${Config.apiUrl}/meetings/${fields.id}`, fields, config)
    .then(response => {
      console.log("API update success:", response);
    }).catch(response => {
      return console.log("API update error: ", response);
    });

    this.setState({
      meetings: rows,
      error: null
    });
  }


  // delete meeting
  deleteMeeting({index, meetings}) {

    const meetingId = meetings[index].id;

    const accessToken = localStorage.getItem('access_token');

    // set axios auth header
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };

    // delete row in table
    axios
    .delete(`${Config.apiUrl}/meetings/${userTypeId}`, config)
    .then(response => {
      //console.log("API Delete success:", response);

      this.setState({
        meetings: update(meetings, {$splice: [[index, 1]]}),
        error: null
      });

    }).catch(response => {
      return console.log("API delete error: ", response);
    });
  }


  // insert user type
  insertMeeting({index, meetings}) {

    // get access token
    const accessToken = localStorage.getItem('access_token');

    // fields to update
    const fields = {
      title: 'New Meeting',
      type: 'other',
      notes: 'Enter your notes here.',
      held_on: '',
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
    .post(`${Config.apiUrl}/meetings`, fields, config)
    .then(response => {

      console.log('API insert success (last insert id):', response.data);

      const updatedFields = {
        id: response.data.last_insert_id,
        ...fields
      };

      const newMeetings = update([...meetings], {$splice: [[index, 0, updatedFields]]});

      //console.log("newMeetings:", newMeetings);

      this.setState({
        meetings: newMeetings,
        error: null
      });

    }).catch(response => {
      return console.log('API insert error: ', response);
    });
  }




} // end class

export default alt.createStore(MeetingStore, 'MeetingStore');
