import React, {Component} from 'react';
import ReactTable from 'react-table';
import UserStore from 'app/stores/UserStore';
import UserActions from 'app/actions/UserActions';
import connectToStores from 'alt/utils/connectToStores';
import FormUsers from 'app/components/forms/FormUsers';

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
      Footer: () => { return (<a onClick={this.addNewUser.bind(this)}>Add New User</a>) }
    }, {
      Header: 'Email',
      accessor: 'email'
    }];

  }

  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return {
      users: UserStore.getState().users,
      expanded: UserStore.getState().expanded,
      error: UserStore.getState().error
    }
  }

  componentWillMount() {
    UserActions.getUsers();
  }

  addNewUser() {
    // update state
    UserActions.insertUser({
      //index: this.props.data.row._index,
      index: UserStore.getState().users.length,
      users: UserStore.getState().users
    });
  }

  render() {

    //console.log('users[0] at render():', this.props.users[0]);

    // default output
    let output = '';

    // API error
    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }

    if (!this.props.users.length) {
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
            defaultPageSize={15}
            SubComponent={(row) => {
              return (
                <FormUsers data={row} />
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
