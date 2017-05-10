import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
//import ReactDataGrid from 'react-data-grid/addons';
import UserStore from 'app/store/UserStore';
import UserActions from 'app/actions/UserActions';
import connectToStores from 'alt/utils/connectToStores';
import {Tab, Tabs, TabPanel, TabList} from 'react-tabs';

Tabs.setUseDefaultStyles(0);

class Table extends Component {
  constructor(props) {
    super(props);
  }
  static onClickEdit(id) {
    console.log('Editing row with ID:', id);
  }
  static onClickDelete(id) {
    console.log('Deleting row with ID:', id);
  }
  render() {
    const {data} = this.props;

    /*
     <td key={data.id}>
     <a><i className="material-icons mode-blue">mode_edit</i></a>
     <a><i className="material-icons mode-red">delete</i></a>
     </td>
     */

    const rows = data.map((data) =>
      <tr key={data.id}>
        <td key={data.id}>{data.id}</td>
        <td key={data.name}>{data.name}</td>
        <td key={data.email}>{data.email}</td>
      </tr>
    );

    return (
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class PageUsers extends Component {
  constructor(props) {
    super(props);

    //this.state = UserStore.getState();
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'name', name: 'Name' },
      { key: 'email', name: 'Email' } ];
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
  componentDidMount() {
    UserActions.getUsers();
  }
  createRows() {
    this._rows = this.props.users;
  }
  rowGetter(i) {
    return this._rows[i];
  }
  render() {

    console.log("Users at render():", this.props.users);


    if (this.props.error) {
      return (
        <div>{this.props.error}</div>
      );
    }


    let tab1Output = '';
    if (!this.props.users.length) {
      tab1Output = <div className="loading"><img src="images/loading.svg" /></div>;
    } else {
      //tab1Output = <Table data={this.props.users}/>;
      tab1Output = (
        <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} />
      );
    }

    return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>

        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              {tab1Output}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              Tab 2
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              Tab 3
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
    );
  }
}

export default connectToStores(PageUsers);
