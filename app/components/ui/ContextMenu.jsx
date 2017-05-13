import React, {Component} from 'react';
const { Menu: { ContextMenu, MenuItem, SubMenu } } = require('react-data-grid-addons');

export default class MyContextMenu extends Component {

  onRowDelete(e, data) {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  }

  onRowInsert(e, data) {
    if (typeof(this.props.onRowInsert) === 'function') {
      this.props.onRowInsert(e, data);
    }
  }

  onRowInsertAbove(e, data) {
    if (typeof(this.props.onRowInsertAbove) === 'function') {
      this.props.onRowInsertAbove(e, data);
    }
  }

  onRowInsertBelow(e, data) {
    if (typeof(this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  }

  render() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete.bind(this)}>Delete Row</MenuItem>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsert.bind(this)}>Insert Row</MenuItem>
        {/*
        <SubMenu title="Insert Row">
          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertAbove.bind(this)}>Above</MenuItem>
          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertBelow.bind(this)}>Below</MenuItem>
        </SubMenu>
        */}
      </ContextMenu>
    );
  }
}

/*
MyContextMenu.propTypes = {
  onRowDelete: React.PropTypes.func.isRequired,
  onRowInsertAbove: React.PropTypes.func.isRequired,
  onRowInsertBelow: React.PropTypes.func.isRequired,
  rowIdx: React.PropTypes.string.isRequired,
  idx: React.PropTypes.string.isRequired
};
*/
