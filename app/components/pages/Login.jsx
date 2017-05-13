import React, {Component} from 'react';
import AuthStore from 'app/stores/AuthStore';
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
    const divError = (AuthStore.getState().error) ? (<div className='login-error'>{AuthStore.getState().error}</div>) : null;

    return (
      <div>
        <div className="login-logo"><img src="images/app-logo.svg" alt="Clearlink Lead"/></div>

          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="login-top">
                <label>Username
                  <input type="text" ref="usernameInput" placeholder="Username"/>
                </label>
                <label>Password
                  <input type="password" ref="passwordInput" placeholder="Password"/>
                </label>
              </div>
              <div className="login-bottom text-right">
                <button className="button expanded" onClick={this.onClickLogin.bind(this)}>Login</button>
                {divError}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default connectToStores(Login);
