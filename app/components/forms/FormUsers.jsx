import React, {Component} from 'react';
import UserStore from 'app/stores/UserStore';
import UserActions from 'app/actions/UserActions';
import connectToStores from 'alt/utils/connectToStores';

export default class FormUsers extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.data.row.id;
    this.name = this.props.data.row.name;
    this.email = this.props.data.row.email;
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

  insertUser(e) {
    e.preventDefault();

    // update state
    UserActions.insertUser({
      //index: this.props.data.row._index,
      index: UserStore.getState().users.length,
      users: UserStore.getState().users
    });
  }

  updateUser(e) {
    e.preventDefault();
    console.log("row:", this.props.data.row);

    const updated = {
      name: this.refs.name.value,
      email: this.refs.email.value
    };

    // update state
    UserActions.updateUsers({
      index: this.props.data.row._index,
      updated,
      users: UserStore.getState().users
    });
  }

  deleteUser(e) {
    e.preventDefault();

    // update state
    UserActions.deleteUser({
      index: this.props.data.row._index,
      users: UserStore.getState().users
    });

    this.render();
  }

  render() {

    //console.log("ID:", this.props.data);

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
