import alt from 'app/alt';

class MeetingActions {
  constructor() {
    this.generateActions(
      'getMeetings',
      'updateMeetings',
      'deleteMeeting',
      'insertMeeting'
    );
  }
}

export default alt.createActions(MeetingActions);
