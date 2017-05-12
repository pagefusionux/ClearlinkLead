import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import UserStore from 'app/stores/UserStore';
import UserActions from 'app/actions/UserActions';
import connectToStores from 'alt/utils/connectToStores';

//const data = require('json!app/components/tabs/Users/data.json');

class Tab1 extends Component {
  constructor(props) {
    super(props);

    this._columns = [
      { key: 'id', name: 'ID', locked: true, width: 75 },
      { key: 'name', name: 'Name', editable: true, resizable: true },
      { key: 'email', name: 'Email', editable: true, resizable: true }
    ];
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

  getRows(i) {
    return UserStore.getState().users[i];
  }

  getSubRowDetails(rowItem) {
    let isExpanded = UserStore.getState().expanded[rowItem.name] ? UserStore.getState().expanded[rowItem.name] : false; // removed this.state.expanded
    return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: 'id',
      treeDepth: rowItem.treeDepth || 0,
      siblingIndex: rowItem.siblingIndex,
      numberSiblings: rowItem.numberSiblings
    };
  }

  updateSubRowDetails(subRows, parentTreeDepth) {
    let treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
    });

    return subRows;
  }

  onCellExpand(args) {
    let rows = UserStore.getState().users.slice(0);
    let rowKey = args.rowData.id;
    let rowIndex = rows.indexOf(args.rowData);
    let subRows = args.expandArgs.children;

    let expanded = Object.assign({}, UserStore.getState().expanded);

    if (expanded && !expanded[rowKey]) {
      expanded[rowKey] = true;

      let treeDepth = args.rowData.treeDepth || 0;
      subRows.forEach((sr, i) => {
        sr.treeDepth = treeDepth + 1;
        sr.siblingIndex = i;
        sr.numberSiblings = subRows.length;
      });

      rows.splice(rowIndex + 1, 0, ...subRows);
    } else if (expanded[rowKey]) {
      expanded[rowKey] = false;
      rows.splice(rowIndex + 1, subRows.length);
    }

    // update state
    UserActions.expandRows({
      users: rows,
      expanded,
      error: null
    });
  }

  handleGridRowsUpdated({fromRow, toRow, updated}) {

    // could we consolidate this to just update a single row via API (instead of the whole users array)?

    // update state
    UserActions.putUsers({
      fromRow,
      toRow,
      updated,
      users: UserStore.getState().users
    });
  }

  render() {

    //console.log("users[0] at render():", this.props.users[0]);
    //console.log("userData:", this._rows[0]);

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
        <ReactDataGrid
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.getRows}
          rowsCount={this.props.users.length}
          //rowsCount={this._rows.length}
          getSubRowDetails={this.getSubRowDetails}
          onCellExpand={this.onCellExpand}
          onGridRowsUpdated={this.handleGridRowsUpdated}/>
      );
    }

    return output;
  }
}

export default connectToStores(Tab1);
