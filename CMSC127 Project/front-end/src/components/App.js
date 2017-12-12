import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home'
import Base from './Base'
import Student from './Student/Student'
import Adviser from './Adviser/Adviser'
import Paper from './Paper/Paper'
import ReportThree from './Report/ReportThree'
import ReportFour from './Report/ReportFour'
import ReportFive from './Report/ReportFive'
import ReportSix from './Report/ReportSix'
import ReportOne from './Report/ReportOne'
import ReportTwo from './Report/ReportTwo'
import ReportEight from './Report/ReportEight'
import PaperTopic from './Other/PaperTopic'
import AssignedAdviser from './Other/AssignedAdviser'
import CoAuthor from './Other/CoAuthor'
import Panel from './Other/Panel'
import '../css/App.css'
import Co from './Other/CoAuthorAdd'
import Ass from './Other/AssignedAdviserAdd'
class App extends Component {
  render() {
    return (
      <div id="main">
        <Base/>
        <Router>
          <div id="content-container">
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/student" component={Student} />
            <Route exact={true} path="/adviser" component={Adviser} />
            <Route exact={true} path="/paper" component={Paper} />
            <Route exact={true} path="/report-one" component={ReportOne} />
            <Route exact={true} path="/report-two" component={ReportTwo} />
            <Route exact={true} path="/report-three" component={ReportThree} />
            <Route exact={true} path="/report-four" component={ReportFour} />
            <Route exact={true} path="/report-five" component={ReportFive} />
            <Route exact={true} path="/report-six" component={ReportSix} />
            <Route exact={true} path="/report-eight" component={ReportEight} />
            <Route exact={true} path="/paper-topics" component={PaperTopic} />
            <Route exact={true} path="/assigned-adviser" component={AssignedAdviser} />
            <Route exact={true} path="/coauthor" component={CoAuthor} />
            <Route exact={true} path="/panel" component={Panel} />
            <Route exact={true} path="/co" component={Co} />
            <Route exact={true} path="/assAdd" component={Ass} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
