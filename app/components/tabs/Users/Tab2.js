import React, {Component} from 'react';
import ReactTable from 'react-table';
import UserTypesStore from 'stores/UserTypesStore';
import UserTypesActions from 'actions/UserTypesActions';
import connectToStores from 'alt/utils/connectToStores';
import FormUserTypes from 'components/forms/FormUserTypes';

// over

class ManageUserTypes extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      Header: 'ID',
      accessor: 'id',
      maxWidth: '50'
    },{
      Header: 'Title',
      accessor: 'title',
      textAlign: 'left'
    }];

  }

  static getStores() {
    return [UserTypesStore];
  }

  static getPropsFromStores() {
    return {
      userTypes: UserTypesStore.getState().userTypes,
      userTypesError: UserTypesStore.getState().error
    }
  }

  componentWillMount() {
    if (UserTypesStore.getState().userTypes.length === 0) {
      UserTypesActions.getUserTypes();
    }
  }

  addNewUserType() {
    // update state
    UserTypesActions.insertUser({
      //index: this.props.data.row._index,
      index: UserTypesStore.getState().userTypes.length,
      users: UserTypesStore.getState().userTypes
    });
  }

  render() {

    // default output
    let output = '';

    // UserTypes: API error
    if (this.props.userTypesError) { return <div>{this.props.userTypesError}</div>; }

    if (!this.props.userTypes.length) {
      output = (
        <div className="loading"><img src="images/loading.svg" /></div>
      );

    } else {

      output = (
        <div>
          <ReactTable
            className="-striped -highlight"
            previousText="Back"
            data={this.props.userTypes}
            columns={this.columns}
            showPageSizeOptions={false}
            defaultPageSize={10}
            SubComponent={(row) => {
              //console.log('this row:', row);
              const formData = this.props.userTypes[row.index];

              return (
                <FormUserTypes
                  data={formData}
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

export default connectToStores(ManageUserTypes);
