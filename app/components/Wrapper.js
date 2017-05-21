import React, {Component} from 'react';
import Nav from 'components/ui/Nav';

export default class Wrapper extends Component {
  render () {
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}

