import React, { Component } from 'react';
import '../css/Base.css'
import studentIcon from '../assests/student.png'
import adviserIcon from '../assests/adviser.png'
import bookIcon from '../assests/paper.png'
class Base extends Component {
  render() {
    return (
      <div id="sidebar">
        <header>

        </header>

        <aside>
          <ul>
            <li><a  href='/student' ><img src={studentIcon} className="student-icon" alt="student icon" height="25px"/>Students</a></li>
            <li><a  href='/adviser'> <img src={adviserIcon} className="student-icon" alt="adviser icon" height="25px"/>Advisers</a></li>
            <li><a  href='/paper' ><img src={bookIcon} className="student-icon" alt="book icon" height="25px"/>Papers</a></li>
          </ul>

				<hr/>
				<ul>
					<li><a  href='/report-one'>Papers by Co-authors</a></li>
					<li><a  href='/report-two'>Papers by Topic</a></li>
					<li><a  href='/report-three'>Papers by Year</a></li>
					<li><a  href='/report-four'>Papers by Month</a></li>
					<li><a  href='/report-five'>Papers by Year & Month</a></li>
					<li><a  href='/report-six'>Award Winning Papers</a></li>
					<li><a  href='/'>Papers and Authors</a></li>
					<li><a  href='/report-eight'>Papers and Panelists</a></li>
				</ul>
				<hr/>

				<ul>
						<li><a href='/paper-topics'>Paper Topics</a></li>
						<li><a href='/assigned-adviser'>Assigned Advisers</a></li>
						<li><a href='/coauthor'>Co-Authors of Papers</a></li>
						<li><a href='/panel'>Panelled Papers</a></li>
				</ul>

        </aside>
      </div>
    );
  }
}

export default Base;
