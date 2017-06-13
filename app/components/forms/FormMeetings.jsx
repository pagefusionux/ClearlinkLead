import React, { Component } from 'react';
import MeetingStore from 'app/stores/MeetingStore';
import MeetingActions from 'app/actions/MeetingActions';
import connectToStores from 'alt/utils/connectToStores';
import {convertTimestamp} from 'app/helpers';

class FormMeetings extends Component {
  constructor(props) {
    super(props);

    // form field/output data
    this.id = this.props.data.id;
    this.title = this.props.data.title;
    this.type = this.props.data.type;
    this.notes = this.props.data.notes;
    this.held_on = convertDateTime(this.props.data.held_on);
    this.created_at = convertTimestamp(this.props.data.created_at); // 2017-05-12 22:42:33
    this.updated_at = convertTimestamp(this.props.data.updated_at); // 2017-05-13 11:20:41

    // state for select fields
    /*
    this.state = {
      userTypesSelectValue: this.props.data.user_type_id
    }
    */
  }

  static getStores() {
    return [MeetingStore];
  }

  static getPropsFromStores() {
    return {
      users: MeetingStore.getState().meetings,
      error: MeetingStore.getState().error
    }
  }

  componentWillMount() {

  }

  insertMeeting(e) {
    e.preventDefault();

    // update state
    MeetingActions.insertMeeting({
      index: MeetingStore.getState().meetings.length,
      meetings: MeetingStore.getState().meetings
    });
  }

  updateMeeting(e) {
    e.preventDefault();

    const updated = {
      title: this.refs.title.value,
      type: this.refs.type.value,
      notes: this.refs.notes.value,
      held_on: this.refs.held_on.value
    };

    // update state
    MeetingActions.updateMeetings({
      index: this.props.index,
      updated,
      meetings: MeetingStore.getState().meetings
    });
  }

  deleteMeeting(e) {
    e.preventDefault();

    // update state
    MeetingActions.deleteMeeting({
      index: this.props.index,
      meetings: MeetingStore.getState().meetings
    });
  }

  /*
  handleSelectChange(e) {
    this.setState({
      userTypesSelectValue: e.target.value
    });
  }
  */

  render() {

    //console.log("ID:", this.props.data);
    //console.log('userTypes at render:', this.props.userTypes);

    // create select component from userTypes array
    /*
    let userTypeSelectOptions = [];

    userTypeSelectOptions.push(
      <option key={-1} value={0}>Select User Type...</option>
    );

    for (let i = 0; i < this.props.userTypes.length; i += 1) {
      let option = this.props.userTypes[i];
      userTypeSelectOptions.push(
        <option key={i} value={option.id}>{option.title}</option>
      );
    }
    */
    //console.log('userTypeSelectOptions:', userTypeSelectOptions);

    return (
      <div className="form-wrapper">
        <div className="FormMeetings">
          <form>
            <div className="row">
              <div className="small-12 medium-6 columns">
                <label>Title
                  <input type="text" ref="title" placeholder="Meeting Title" defaultValue={this.title}/>
                </label>
              </div>
              <div className="small-12 medium-6 columns">
                <label>Type
                  <input type="text" ref="type" placeholder="Meeting Type" defaultValue={this.type}/>
                </label>
              </div>
              <div className="small-12 medium-6 columns">
                <label>Held On
                  <input type="held_on" ref="held_on" placeholder="2017-05-23 12:00:00" defaultValue={this.held_on}/>
                </label>
              </div>
              {/*
              <div className="small-12 medium-6 columns">
                <label>Role
                  <select onChange={this.handleSelectChange.bind(this)} defaultValue={this.user_type_id} value={this.state.userTypesSelectValue}>
                    {userTypeSelectOptions}
                  </select>
                </label>
              </div>
              */}
              <div className="small-12 columns">
                <label>Notes
                  <textarea ref="notes" defaultValue={this.notes}></textarea>
                </label>
              </div>
              <div className="small-12 columns">
                <div className="timestamps">
                  <span className="stamp-label">Created at:</span> {this.created_at},&nbsp;
                  <span className="stamp-label">Updated at:</span> {this.updated_at}
                </div>
              </div>
              <div className="small-12 columns">
                <button className="button secondary float-left" onClick={this.insertMeeting.bind(this)}>Insert</button>
                <div className="button-group-right float-right">
                  <button className="button" onClick={this.updateMeeting.bind(this)}>Update</button>
                  <button className="button alert" onClick={this.deleteMeeting.bind(this)}>Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToStores(FormMeetings);
