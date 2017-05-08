import React, {Component} from 'react';
import axios from 'axios';
//import ReactTable from 'react-table';
import {Tab, Tabs, TabPanel, TabList} from 'react-tabs';

Tabs.setUseDefaultStyles(0);

class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data} = this.props;

    console.log("Data Array:", data);

    const rows = data.map((data) =>
      <tr key={data.id}>
        <td key={data.id}>{data.id}</td>
        <td key={data.name}>{data.name}</td>
        <td key={data.email}>{data.email}</td>
      </tr>
    );

    return (
      <table className="table-scroll">
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
    );
  }
}

export default class PageUsers extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: []
    };
  };
  componentDidMount() {
      const _this = this;

      axios
      .get("http://localhost.lumenoauth/users")
      .then(function(result) {
        //console.log(result.data.data);
        _this.setState({
          users: result.data.data
        });
      });
  }
  componentWillUnmount() {
    //this.serverRequest.abort();
  }
  render() {

    const usersData = [
      {
        id: 1,
        name: 'Chris Davis',
        email: 'pagefusion@gmail.com'
      },
      {
        id: 2,
        name: 'David Wilkins',
        email: 'david@onlinestore.com'
      },
      {
        id: 3,
        name: 'Vanessa Smith',
        email: 'vanessa.smith@gmail.com',
      }
    ];

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
              <Table data={this.state.users}/>
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
