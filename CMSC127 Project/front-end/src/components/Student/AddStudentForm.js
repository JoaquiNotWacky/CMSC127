import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Form.css'
class AddStudentForm extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			list_of_student: [],
			colleges: [],
			course_list: [],
			choose_course: [],
			student_no: '',
			course: '',
			college:'',
			first_name: '',
			middle_name: '',
			last_name: '',
			canAdd: '',
    }
  }

	componentDidMount(){
    this.getStudents()
		this.getColleges()
		this.getCourses()
  }

	addStudent(){
		axios.post('http://localhost:3003/ischolar/insert-student',{
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
		this.props.makeTable()
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

	courseHandler(e){
		this.setState({course: e.target.value})
	}

  getStudents(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-all-student-number', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

	studentNumberHandler(e){
		this.setState({student_no: e.target.value})
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

	pressed(){
		console.log(this.state.student_no);
		console.log(this.state.college);
		console.log(this.state.course);
		console.log(this.state.first_name);
		console.log(this.state.middle_name);
		console.log(this.state.last_name);
	}

  render() {
    return (
      <div>
        <button onClick={this.props.makeTable} className="cancel main-button">CANCEL</button>

        <form className="mainForm">

          <label>Student Number</label>
          <br/>
          <input type="text" className="inputFields" pattern="^[0-9]{4}-[0-9]{5}$" placeholder="E.g. 2015-12345"  maxLength="10" onChange={this.studentNumberHandler}/>
					<br/>

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
          <input type="text" placeholder="First Name" className="inputFields" maxLength="30" onChange={this.firstNameHandler}/>
					<br/>
          <label>Middle Name</label>
          <br/>
          <input type="text" placeholder="Middle Name" className="inputFields" maxLength="20" onChange={this.middleNameHandler}/>
					<br/>

          <label>Last Name</label>
          <br/>
          <input type="text" placeholder="Last Name" className="inputFields" maxLength="20" onChange={this.lastNameHandler}/>
					<br/>

					<button type="button" className="add-button" onClick={this.addStudent} disabled={this.canAdd}>Adding Student</button>

        </form>

      </div>
    );
  }

}


export default AddStudentForm;
