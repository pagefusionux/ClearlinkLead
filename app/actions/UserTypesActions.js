import alt from 'alt';

class UserTypesActions {
  constructor() {
    this.generateActions(
      'getUserTypes',
      'updateUserTypes',
      'deleteUserType',
      'insertUserType'
    );
  }
}

export default alt.createActions(UserTypesActions);
