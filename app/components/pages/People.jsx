import React, {Component} from 'react';
import {Tab, Tabs, TabPanel, TabList} from 'react-tabs';

import Tab1 from 'app/components/tabs/Users/Tab1';
import Tab2 from 'app/components/tabs/Users/Tab2';

Tabs.setUseDefaultStyles(0);

export default class People extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Roles</Tab>
        </TabList>

        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              <Tab1/>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              <Tab2/>
            </div>
          </div>
        </TabPanel>

      </Tabs>
    </div>
    );
  }
}
