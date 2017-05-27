import React, {Component} from 'react';
import ReactTable from 'react-table';
import MeetingStore from 'app/stores/MeetingStore';
import MeetingActions from 'app/actions/MeetingActions';
import connectToStores from 'alt/utils/connectToStores';
import FormMeetings from 'app/components/forms/FormMeetings';

// Team
class Tab1 extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      Header: 'ID',
      accessor: 'id',
      maxWidth: '50'
    },{
      Header: 'Title',
      accessor: 'title',
      textAlign: 'left'
    }, {
      Header: 'Type',
      accessor: 'type',
      textAlign: 'left'
    }, {
      Header: 'Held on',
      accessor: 'email'
    }];

  }

  static getStores() {
    return [MeetingStore];
  }

  static getPropsFromStores() {
    return {
      ...MeetingStore.getState()
    }
  }

  componentWillMount() {
    if (MeetingStore.getState().meetings.length === 0) {
      MeetingActions.getMeetings();
    }
  }

  addNewMeeting() {
    // update state
    MeetingActions.insertMeeting({
      index: MeetingStore.getState().meetings.length,
      meetings: MeetingStore.getState().meetings
    });
  }

  render() {

    console.log('meetings[0] at render():', this.props.meetings[0]);

    // default output
    let output = '';

    // Users: API error
    if (this.props.error) { return <div>{this.props.error}</div>; }

    if (!this.props.meetings.length) {
      output = (
        <div className="loading"><img src="images/loading.svg" /></div>
      );

    } else {

      output = (
        <div>
          <ReactTable
            className="-striped -highlight"
            previousText="Back"
            data={this.props.meetings}
            columns={this.columns}
            showPageSizeOptions={false}
            defaultPageSize={15}
            SubComponent={(row) => {
              const formData = this.props.meetings[row.index];

              return (
                <FormMeetings
                  data={formData}
                  users={true} // users
                  items={true} // meeting_action_items
                  index={row.index}
                />
              )
            }}
          />
        </div>
      );
    }

    return output;
  }
}

export default connectToStores(Tab1);
