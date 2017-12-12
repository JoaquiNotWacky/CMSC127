import React, {Component} from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Other.css'

class CoAuthor extends Component{
	constructor(props){
		super(props)
		autobind(this)
		this.state = {
			advisers: [],
			students: [],
			choosen_adviser: '',
			choosen_student: '',
			type: ''
		}
	}

	componentDidMount(){
		this.getAdvisers();
		this.getStudents();
	}


		getAdvisers(){
			const self = this;
	    axios.get('http://localhost:3003/ischolar/get-all-advisers', {})
	    .then(function(response){
	      self.setState({
	        advisers: response.data
	      }, console.log(response.data))
	    })
		}

		adviserHandler(e){
			this.setState({choosen_adviser: e.target.value});
		}

		typeHandler(e){
			this.setState({type: e.target.value});
		}

		studentHandler(e){
			this.setState({choosen_student: e.target.value});
		}

		getStudents(){
	    const self = this;
	    axios.get('http://localhost:3003/ischolar/get-all-students', {})
	    .then(function(response){
	      self.setState({
	        students: response.data
	      }, console.log(response.data))
	    })
	  }

		addAssigned(){
			const self = this;
			axios.post('http://localhost:3003/ischolar/insert-assigned-advisers',{
				data:{
					studno: self.state.choosen_student,
					facid: self.state.choosen_adviser,
					type: self.state.type,
				}
			})
			.then(function(response){
				console.log(response.data)
			})
			location.href = '/assigned-adviser'
		}

		back(){
			location.href= '/assigned-adviser'
		}

	render(){
		return(
			<div>
				<button onClick={this.back}>CANCEL</button>
				<select  className="inputFields list_stud" onChange={this.adviserHandler}>
					{this.state.choosen_adviser === '' ? <option>Choose Adviser</option>: ''}
						{this.state.advisers.map((ad) =>{
							return (<option key={ad.faculty_id}
							value={ad.faculty_id}>{ad.faculty_id} - {ad.l_name}, {ad.f_name}</option>)
						})}
					</select>

				<select  className="inputFields list_stud" onChange={this.studentHandler}>
					{this.state.choosen_student === '' ? <option>Choose Student</option>: ''}
						{this.state.students.map((ad,index) =>{
							return (<option key={ad.student_no}
							value={ad.student_no}>{ad.student_no} - {ad.l_name}, {ad.f_name}</option>)
						})}
					</select>

					<select className="inputFields" onChange={this.typeHandler}>
						{this.state.type === '' ? <option>Choose Type of Adviser</option>: ''}
						<option value="Main Adviser">Main Adviser</option>
						<option value="Sub Adviser">Sub Adviser</option>
					</select>

					<button onClick={this.addAssigned}>Add Assigned Adviser</button>
			</div>
		)
	}

}

export default CoAuthor
