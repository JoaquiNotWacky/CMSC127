import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Form.css'
class EditStudentForm extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			colleges: [],
			course_list: [],
			choose_course: [],
			student_no: this.props.theStudent.student_no,
			course: '',
			college:'',
			first_name: this.props.theStudent.f_name,
			middle_name: this.props.theStudent.m_name,
			last_name: this.props.theStudent.l_name,
			canAdd: '',
    }
  }

	componentDidMount(){
		this.getColleges()
		this.getCourses()
  }

	getColleges(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-colleges', {})
		.then(function(response){
			self.setState({
				colleges: response.data
			})
		})
	}


	getCourses(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-courses', {
		})
		.then(function(response){
			self.setState({ course_list: response.data })
		})
	}

	collegeHandler(e){
		this.setState({college: e.target.value, course: ''}, this.setCourses(e.target.value))
	}

	setCourses(e){
		var list = []
		var n = 0
		console.log(this.state.course_list.length)
		while(n < this.state.course_list.length){
			if(this.state.course_list[n].college === e){
				list.push(this.state.course_list[n])
			}
			n++
		}
		if(n === this.state.course_list.length){
			this.setState({choose_course: list})
		}
	}

	updateStudent(){
		axios.post('http://localhost:3003/ischolar/update-student',{
			data:{
				studno: this.state.student_no,
				course: this.state.course,
				college: this.state.college,
				fname: this.state.first_name,
				mname: this.state.middle_name,
				lname: this.state.last_name
			}
		})
		.then(function(response){
			console.log(response);
		})
		this.props.makeTable();
	}

	courseHandler(e){
		this.setState({course: e.target.value})
	}

	firstNameHandler(e){
		this.setState({first_name: e.target.value})
	}

	middleNameHandler(e){
		this.setState({middle_name: e.target.value})
	}

	lastNameHandler(e){
		this.setState({last_name: e.target.value})
	}

  render() {
    return (
      <div>
        <button onClick={this.props.makeTable} className="cancel main-button">CANCEL</button>

        <form className="mainForm">
					<label>College</label>
					<br/>
					<select onChange={this.collegeHandler} className="inputFields">
		      	{this.state.college === '' ? <option>Choose College</option>: ''}
							{this.state.colleges.map((colleges) =>{
								return (<option key={colleges.id}
								value={colleges.college}>{colleges.college}</option>)
							})}
						</select>

				<br/>

				<label>Course</label>
				<br/>
				{ this.state.college === '' ? <div><select><option>Choose Course</option></select></div> :
					<div>
						<select onChange={this.courseHandler} className="inputFields">
								{this.state.course === '' ? <option></option>: ''}
								{this.state.choose_course.map((course) =>{
									return (<option key={course.id} value={course.course}>{course.course}</option>)
								})}
						</select>
					</div>
				}
				<br/>

          <label>First Name</label>
          <br/>
          <input type="text" placeholder="First Name" className="inputFields" maxLength="30" onChange={this.firstNameHandler} value={this.state.first_name}/>
					<br/>
          <label>Middle Name</label>
          <br/>
          <input type="text" placeholder="Middle Name" className="inputFields" value={this.state.middle_name} maxLength="20" onChange={this.middleNameHandler}/>
					<br/>

          <label>Last Name</label>
          <br/>
          <input type="text" placeholder="Last Name" value={this.state.last_name} className="inputFields" maxLength="20" onChange={this.lastNameHandler}/>
					<br/>

					<button type="button" className="add-button" onClick={this.updateStudent} disabled={this.canAdd}>Update Student</button>

        </form>

      </div>
    );
  }

}


export default EditStudentForm;
