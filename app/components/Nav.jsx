import React, {Component} from 'react';
import {Router, Link} from 'react-router';
import AuthActions from 'app/actions/AuthActions';

export default class Nav extends Component {
  constructor(props) {
    super(props);
  }
  onClickLogout() {
    AuthActions.logout();
  }
  componentDidMount() {
    $(document).foundation();
  }
  componentDidUpdate() {
    //$(document).foundation();
  }
  render () {
    return (
      <div>
        <div className="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
          <div className="title-menu">
            <button className="menu-icon" type="button" data-toggle=""></button>
          </div>
          <div className="title-bar-title">
            <img className="cl-logo float-right" src="/images/toolbar-logo.svg" />
          </div>
        </div>

        <div className="top-bar" id="example-menu">
          <div className="top-bar-right">
            <ul className="menu">
              {/*<li className="menu-text">App Name</li>*/}
              <li className="menu-text">
                <button onClick={this.onClickLogout.bind(this)}>
                  <i className="material-icons">exit_to_app</i> Logout
                </button>
              </li>
              <li className="menu-text"><img className="cl-logo hide-for-small-only" src="/images/toolbar-logo.svg" /></li>
            </ul>
          </div>
          <div className="top-bar-left">
            <ul className="medium-horizontal vertical dropdown menu" data-responsive-menu="accordion medium-dropdown">
              {/*
              <li className="has-submenu">
                <Link to="/Page1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Page1</Link>
                <ul className="submenu menu vertical nested" data-submenu>
                  <li><Link to="/Page4" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Page4</Link></li>
                  <li><Link to="/Page5" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Page5</Link></li>
                </ul>
              </li>
               */}
              <li><Link to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Users</Link></li>
              <li><Link to="/Page2" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Page2</Link></li>
              <li><Link to="/Page3" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Page3</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
