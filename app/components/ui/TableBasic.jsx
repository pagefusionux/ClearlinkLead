import React, {Component} from 'react';

class TableBasic extends Component {
  constructor(props) {
    super(props);
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
