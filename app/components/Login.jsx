import React, {Component} from 'react';

import AuthStore from 'app/store/AuthStore';
import AuthActions from 'app/actions/AuthActions';
import connectToStores from 'alt/utils/connectToStores';

export class Login extends Component {
  static getStores() {
    return [AuthStore];
  }

  static getPropsFromStores() {
    return AuthStore.getState();
  }

  onClickLogin() {
    AuthActions.login({
      username: this.refs.usernameInput.value,
      password: this.refs.passwordInput.value
    });
  }

  render () {
    const divError = (AuthStore.getState().error) ? (<p>{AuthStore.getState().error}</p>) : null;

    return (
      <div>
        <h1 className="page-title">Clearlink Lead</h1>

          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="login-container">
                <label>Username
                  <input type="text" ref="usernameInput" placeholder="Username"/>
                </label>
                <label>Password
                  <input type="password" ref="passwordInput" placeholder="Password"/>
                </label>
                <button className="button" onClick={this.onClickLogin.bind(this)}>Login</button>
                {divError}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default connectToStores(Login);
