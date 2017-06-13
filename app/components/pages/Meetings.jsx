import React, {Component} from 'react';
import {Tab, Tabs, TabPanel, TabList} from 'react-tabs';

import Tab1 from 'app/components/tabs/Meetings/Tab1';

export default class Meetings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>All</Tab>
          </TabList>

          <TabPanel>
            <div className="row">
              <div className="small-12 columns">
                <Tab1/>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
