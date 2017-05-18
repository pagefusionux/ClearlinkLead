import React, { Component } from 'react';
import UserStore from 'app/stores/UserStore';
import UserActions from 'app/actions/UserActions';
import connectToStores from 'alt/utils/connectToStores';
import {convertTimestamp} from 'app/helpers.js';

class FormUsers extends Component {
  constructor(props) {
    super(props);

    // form field/output data
    this.id = this.props.data.id;
    this.name = this.props.data.name;
    this.email = this.props.data.email;
    this.notes = this.props.data.notes;
    this.user_type_id = this.props.data.user_type_id;
    this.created_at = convertTimestamp(this.props.data.created_at); // 2017-05-12 22:42:33
    this.updated_at = convertTimestamp(this.props.data.updated_at); // 2017-05-13 11:20:41

    // state for select fields
    this.state = {
      userTypesSelectValue: this.props.data.user_type_id
    }
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

  }

  insertUser(e) {
    e.preventDefault();

    // update state
    UserActions.insertUser({
      index: UserStore.getState().users.length,
      users: UserStore.getState().users
    });
    //UserActions.getUsers();
  }

  updateUser(e) {
    e.preventDefault();

    const updated = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      notes: this.refs.notes.value,
      password: this.refs.password.value,
      user_type_id: this.state.userTypesSelectValue
    };

    // update state
    UserActions.updateUsers({
      index: this.props.index,
      updated,
      users: UserStore.getState().users
    });
  }

  deleteUser(e) {
    e.preventDefault();

    // update state
    UserActions.deleteUser({
      index: this.props.index,
      users: UserStore.getState().users
    });
  }

  handleSelectChange(e) {
    this.setState({
      userTypesSelectValue: e.target.value
    });
  }

  onContentStateChange(contentState) {

    this.notes = contentState;
    /*
    this.setState({
      contentState,
    });
    */
  }

  render() {

    //console.log("ID:", this.props.data);
    //console.log('userTypes at render:', this.props.userTypes);

    // create select component from userTypes array
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

    //console.log('userTypeSelectOptions:', userTypeSelectOptions);

    return (
      <div className="form-wrapper">
        <div className="FormUsers">
          <form>
            <div className="row">
              <div className="small-12 medium-6 columns">
                <label>Name
                  <input type="text" ref="name" placeholder="Name" defaultValue={this.name}/>
                </label>
              </div>
              <div className="small-12 medium-6 columns">
                <label>Email
                  <input type="text" ref="email" placeholder="Email Address" defaultValue={this.email}/>
                </label>
              </div>
              <div className="small-12 medium-6 columns">
                <label>Password
                  <input type="password" ref="password" placeholder="Update Password"/>
                </label>
              </div>
              <div className="small-12 medium-6 columns">
                <label>Role
                  <select onChange={this.handleSelectChange.bind(this)} defaultValue={this.user_type_id} value={this.state.userTypesSelectValue}>
                    {userTypeSelectOptions}
                  </select>
                </label>
              </div>
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
                <button className="button secondary float-left" onClick={this.insertUser.bind(this)}>Insert</button>
                <div className="button-group-right float-right">
                  <button className="button" onClick={this.updateUser.bind(this)}>Update</button>
                  <button className="button alert" onClick={this.deleteUser.bind(this)}>Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToStores(FormUsers);
