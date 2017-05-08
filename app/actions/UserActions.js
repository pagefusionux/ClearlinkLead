import alt from 'app/alt';

class UserActions {
  constructor() {
    this.generateActions(
      'viewAll'
    );
  }
}

export default alt.createActions(UserActions);
