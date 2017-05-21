import React, {Component} from 'react';
import ReactTable from 'react-table';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import UserTypesStore from 'stores/UserTypesStore';
import UserTypesActions from 'actions/UserTypesActions';
import connectToStores from 'alt/utils/connectToStores';
import FormUsers from 'components/forms/FormUsers';

// Team
class Tab1 extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      Header: 'ID',
      accessor: 'id',
      maxWidth: '50'
    },{
      Header: 'Name',
      accessor: 'name',
      textAlign: 'left'
    }, {
      Header: 'Email',
      accessor: 'email'
    }];

  }

  static getStores() {
    return [UserStore, UserTypesStore];
  }

  static getPropsFromStores() {
    return {
      ...UserStore.getState(),
      ...UserTypesStore.getState()
    }
  }

  componentWillMount() {
    if (UserStore.getState().users.length === 0) {
      UserActions.getUsers();
    }
    if (UserTypesStore.getState().userTypes.length === 0) {
      UserTypesActions.getUserTypes();
    }
  }

  addNewUser() {
    // update state
    UserActions.insertUser({
      index: UserStore.getState().users.length,
      users: UserStore.getState().users
    });
  }

  render() {

    //console.log('users[0] at render():', this.props.users[0]);

    // default output
    let output = '';

    // Users: API error
    if (this.props.error) { return <div>{this.props.error}</div>; }

    // UserTypes: API error
    if (this.props.userTypesError) { return <div>{this.props.userTypesError}</div>; }

    if (!this.props.users.length
        || !this.props.userTypes.length) {
      output = (
        <div className="loading"><img src="images/loading.svg" /></div>
      );

    } else {

      output = (
        <div>
          <ReactTable
            className="-striped -highlight"
            previousText="Back"
            data={this.props.users}
            columns={this.columns}
            showPageSizeOptions={false}
            defaultPageSize={15}
            SubComponent={(row) => {
              const formData = this.props.users[row.index];

              return (
                <FormUsers
                  data={formData}
                  userTypes={this.props.userTypes}
                  index={row.index}
                />
              )
            }}
          />
        </div>
      );
    }

    return output;
  }
}

export default connectToStores(Tab1);
