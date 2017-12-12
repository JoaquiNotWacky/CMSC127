import React, { Component } from 'react';
import autobind from 'react-autobind';
import axios from 'axios';

import '../../css/Student.css';
class Student extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			student: this.props.theStudent,
			papers: [],
			advisers: [],
		}
  }

componentDidMount(){
	this.getPaperByStudent()
}

getPaperByStudent(){
	const self = this;
	axios.get('http://localhost:3003/ischolar/get-paper-by-student', {
		params : {
			search: this.props.theStudent.student_no
		}
	})
	.then(function(response){
		self.setState({
			papers: response.data[0]
		}, console.log(response.data[0]))
	})
}
	render() {
    return (
      <div>
        <button onClick={this.props.makeTable} className="cancel main-button">BACK</button> <br/>
					<label>Student Number: {this.state.student.student_no}</label> <br/>
					<label>Name: {this.state.student.l_name}, {this.state.student.f_name} {this.state.student.m_name} </label> <br/>
					<label>Course: {this.state.student.course}</label> <br/>
					<label>College: {this.state.student.college}</label> <br/>
					<br/>

					<label>Papers</label> <br/>
						{this.state.papers.map((data, index)=>{
							return (
								<div key={data.paper_id}>
								<label> Paper #{index+1}</label> <br/>
								<label>Title: {data.title}</label> <br/>
								<label>Classification: {data.classification}</label> <br/>
								<label>Status: {data.status}</label> <br/>
								<label>Field: {data.field}</label> <br/>
								<br/>
							</div>
							);
						})
						}
		  </div>
    );
  }
}

export default Student;
