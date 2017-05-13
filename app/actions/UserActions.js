import alt from 'app/alt';

class UserActions {
  constructor() {
    this.generateActions(
      'getUsers',
      'updateUsers',
      'deleteUser',
      'insertUser'
    );
  }
}

export default alt.createActions(UserActions);
