import alt from 'app/alt';

class AuthActions {
  constructor() {
    this.generateActions(
      'login',
      'localLogin',
      'refreshToken',
      'logout'
    );
  }
}

export default alt.createActions(AuthActions);
