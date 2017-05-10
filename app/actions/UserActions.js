import alt from 'app/alt';

class UserActions {
  constructor() {
    this.generateActions(
      'getUsers'
    );
  }
}

export default alt.createActions(UserActions);
