import alt from 'app/alt';

class UserActions {
  constructor() {
    this.generateActions(
      'getUsers',
      'putUsers',
      'expandRows'
    );
  }
}

export default alt.createActions(UserActions);
