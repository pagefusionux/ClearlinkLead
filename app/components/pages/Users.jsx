import React, {Component} from 'react';
import {Tab, Tabs, TabPanel, TabList} from 'react-tabs';
import Tab1 from 'app/components/tabs/Users/Tab1';
//import Tab1 from 'app/components/tabs/Users/Tab1New';

Tabs.setUseDefaultStyles(0);

export default class Users extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Team</Tab>
          <Tab>Directors</Tab>
          <Tab>OMM</Tab>
          <Tab>PM</Tab>
          <Tab>Other</Tab>
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
              Directors
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              OMM
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              PM
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="small-12 columns">
              Other
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
    );
  }
}
