import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Form.css'
class AddAdviserForm extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			list_of_faculty: [],
			colleges: [],
			department_list: [],
			position_list: [],
			choose_department: [],
			department: [],
			faculty_id: '',
			faculty_pos: '',
			college:'',
			first_name: '',
			middle_name: '',
			last_name: '',
			canAdd: '',
    }
  }

	componentDidMount(){
		this.getColleges()
		this.getDepartments()
		this.getFacultyPositions()
  }

	addAdviser(){
		axios.post('http://localhost:3003/ischolar/insert-adviser',{
			data:{
				id: this.state.faculty_id,
				pos: this.state.faculty_pos,
				college: this.state.college,
				dept: this.state.department,
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
		axios.get('http://localhost:3003/ischolar/get-department-colleges', {})
		.then(function(response){
			self.setState({
				colleges: response.data
			})
		})
	}


	getDepartments(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-departments', {
		})
		.then(function(response){
			self.setState({department_list : response.data })
		})
	}

	getFacultyPositions(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-faculty-positions', {
		})
		.then(function(response){
			self.setState({position_list : response.data })
		})
	}

	collegeHandler(e){
		this.setState({college: e.target.value, department: ''}, this.setDepartments(e.target.value))
	}

	setDepartments(e){
		var list = []
		var n = 0
		console.log(this.state.department_list.length)
		while(n < this.state.department_list.length){
			if(this.state.department_list[n].college === e){
				list.push(this.state.department_list[n])
			}
			n++
		}
		if(n === this.state.department_list.length){
			this.setState({choose_department: list})
		}
	}

	departmentHandler(e){
		this.setState({department: e.target.value})
	}

	facultyPositionHandler(e){
		this.setState({faculty_pos: e.target.value})
	}

  // getAdvisersID(){
  //   const self = this;
  //   axios.get('http://localhost:3003/ischolar/get-all-faculty_id', {})
  //   .then(function(response){
  //     self.setState({
  //       list_of_faculty: response.data
  //     }, console.log(response.data))
  //   })
  // }

	facultIdHandler(e){
		this.setState({faculty_id: e.target.value})
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

          <label>Faculty ID</label>
          <br/>
          <input type="text" className="inputFields" pattern="^[0-9]{10}$" placeholder="E.g. 1234567890"  maxLength="10" onChange={this.facultIdHandler}/>
					<br/>

					<label>Faculty Position</label>
					<br/>
					<select onChange={this.facultyPositionHandler} className="inputFields">
		      	{this.state.faculty_pos === '' ? <option>Choose Faculty Position</option>: ''}
							{this.state.position_list.map((pos) =>{
								return (<option key={pos.id}
								value={pos.faculty_pos}>{pos.faculty_pos}</option>)
							})}
						</select>

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

				<label>Department</label>
				<br/>
				{ this.state.college === '' ? <div><select><option>Choose Department</option></select></div> :
					<div>
						<select onChange={this.departmentHandler} className="inputFields">
								{this.state.department === '' ? <option></option>: ''}
								{this.state.choose_department.map((dept) =>{
									return (<option key={dept.id} value={dept.department}>{dept.department}</option>)
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

					<button type="button" className="add-button" onClick={this.addAdviser}>Adding Adviser</button>

        </form>

      </div>
    );
  }

}


export default AddAdviserForm;
