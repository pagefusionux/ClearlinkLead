import React, {Component} from 'react';
import UserTypesStore from 'app/stores/UserTypesStore';
import UserTypesActions from 'app/actions/UserTypesActions';
import connectToStores from 'alt/utils/connectToStores';
import {convertTimestamp} from 'app/helpers.js';

class FormUserTypes extends Component {
  constructor(props) {
    super(props);

    // form field/output data
    this.id = this.props.data.id;
    this.title = this.props.data.title;
    this.created_at = convertTimestamp(this.props.data.created_at);
    this.updated_at = convertTimestamp(this.props.data.updated_at);

  }

  static getStores() {
    return [UserTypesStore];
  }

  static getPropsFromStores() {
    return {
      userTypes: UserTypesStore.getState().userTypes,
      error: UserTypesStore.getState().error
    }
  }

  insertUserType(e) {
    e.preventDefault();

    // dispatch to update state
    UserTypesActions.insertUserType({
      index: UserTypesStore.getState().userTypes.length,
      userTypes: UserTypesStore.getState().userTypes
    });
  }

  updateUserType(e) {
    e.preventDefault();

    const updated = {
      title: this.refs.title.value
    };

    // dispatch to update state
    UserTypesActions.updateUserTypes({
      index: this.props.index,
      updated,
      userTypes: UserTypesStore.getState().userTypes
    });
  }

  deleteUserType(e) {
    e.preventDefault();

    // dispatch to update state
    UserTypesActions.deleteUserType({
      index: this.props.index,
      userTypes: UserTypesStore.getState().userTypes
    });
  }

  render() {

    return (
      <div className="form-wrapper">
        <div className="FormUserTypes">
          <form>
            <div className="row">
              <div className="small-12 columns">
                <label>Title
                  <input type="text" ref="title" placeholder="Title" defaultValue={this.title}/>
                </label>
              </div>
              <div className="small-12 columns">
                <div className="timestamps">
                  <span className="stamp-label">Created at:</span> {this.created_at},&nbsp;
                  <span className="stamp-label">Updated at:</span> {this.updated_at}
                </div>
              </div>
              <div className="small-12 columns">
                <button className="button secondary float-left" onClick={this.insertUserType.bind(this)}>Insert</button>
                <div className="button-group-right float-right">
                  <button className="button" onClick={this.updateUserType.bind(this)}>Update</button>
                  <button className="button alert" onClick={this.deleteUserType.bind(this)}>Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToStores(FormUserTypes);
