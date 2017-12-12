import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import deleteButton from '../../assests/delete.png'
import viewButton from '../../assests/view.png'
import editButton from '../../assests/edit.png'
class StudentTable extends Component {
  constructor(props){
    super(props);
    autobind(this);

    this.state = {
      table : [],
      search: '',
      input: 'studno',
    }
  }


  componentDidMount(){
    this.getStudents()
  }

  getStudents(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-all-students', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

	searching(){
		console.log("searching")
		if(this.state.input === 'studno') {
			console.log("hello")
			this.getStudentByStudentNumber(this.state.search);
		}else if(this.state.input === 'course') this.getStudentByCourse();
		else if(this.state.input === 'college') this.getStudentByCollege();
		else if(this.state.input === 'fname') this.getStudentByFirstName();
		else if(this.state.input === 'mname') this.getStudentByMiddleName();
		else if(this.state.input === 'lname') this.getStudentByLastName();

	}

  getStudentByMiddleName(){
    const self = this;
    axios.post('http://localhost:3003/ischolar/get-student-by-middle-name', {
			data:{
				mname: self.state.search,
			}
		})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }
  getStudentByFirstName(){
    const self = this;
    axios.post('http://localhost:3003/ischolar/get-student-by-first-name', {
			data:{
				fname: self.state.search,
			}
		})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

  getStudentByCollege(){
    const self = this;
    axios.post('http://localhost:3003/ischolar/get-student-by-college', {
			data:{
				college: self.state.search,
			}
		})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

  getStudentByCourse(){
    const self = this;
    axios.post('http://localhost:3003/ischolar/get-student-by-course', {
			data:{
				course: self.state.search
			}
		})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

  getStudentByStudentNumber(data){
    const self = this;
    axios.post('http://localhost:3003/ischolar/get-student-by-student-number', {
			data:{
				studno: data,
			}
		})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }



	inputHandler(e){
		this.setState({input: e.target.value})
	}

	searchHandler(e){
		this.setState({search: e.target.value})
	}

  deleteStudent(datum){
    axios.post('http://localhost:3003/ischolar/delete-student',{
      data:{
        studno: datum
      }
    }).then(function(response){
      this.getStudents()
    }.bind(this))
  }

	editStudent(e){
		this.props.setStudent(e);
		this.props.makeEdit();
	}

	viewStudent(e){
		this.props.setStudent(e);
		this.props.makeView();
	}

  render() {
    return (
      <div >
        <input type="text" id="myInput" className="inputs" placeholder="Search" onChange={this.searchHandler}/>
        <select onChange={this.inputHandler}>
          <option value="studno">Student Number</option>
          <option value="course">Course</option>
          <option value="college">College</option>
          <option value="fname">First Name</option>
          <option value="mname">Middle Name</option>
          <option value="lname">Last Name</option>
        </select>
        <button className="inputs main-button" onClick={this.searching}>SEARCH</button>
        <button className="inputs main-button" onClick={this.getStudents}>REFRESH TABLE</button>
        <button id="add-student" className="inputs main-button" onClick={this.props.makeAdd}>ADD STUDENT</button>
        <div>
          <table className="student-table inputs">
            <tbody>
            <tr id="table-header">
              <th scope='col'></th>
							<th scope='col' id="studno-col"> Student Number </th>
              <th scope='col' id="course-col"> Course </th>
              <th scope='col' id="course-col"> College </th>
              <th scope='col' id="fname-col"> First Name </th>
              <th scope='col' id="mname-col"> Middle Name </th>
              <th scope='col' id="lname-col"> Last Name </th>
            </tr>
            {this.state.table.map((data) =>{
              return (
                <tr key={data.student_no}>
								  <td><button className="icon" onClick={()=>{this.viewStudent(data)}}><img src={viewButton} alt="edit icon" height="20px" /></button></td>
								  <td>{data.student_no}</td>
                  <td>{data.course}</td>
                  <td>{data.college}</td>
                  <td>{data.f_name}</td>
                  <td>{data.m_name}</td>
                  <td>{data.l_name}</td>
                  <td><button className="icon" onClick={() => {this.deleteStudent(data.student_no)}}><img src={deleteButton} alt="delete icon" height="20px" /></button></td>
                  <td><button className="icon" onClick={() => {this.editStudent(data)}}><img src={editButton} alt="edit icon" height="15px" /></button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
    </div>

      </div>
    );
  }
}

export default StudentTable;
