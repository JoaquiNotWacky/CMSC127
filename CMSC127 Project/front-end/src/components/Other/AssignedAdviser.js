import React, {Component} from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Other.css'
import deleteButton from '../../assests/delete.png'

class AssignedAdviser extends Component{
	constructor(props){
		super(props)
		autobind(this)
		this.state = {
			table: []
		}
	}

	componentDidMount(){
		this.getAssignedAdvisers();
		console.log("hello");
	}

	getAssignedAdvisers(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-assigned-advisers', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

	addCo(){
		location.href='/assAdd'
	}

	deleteAssigned(datum, datum2){
		console.log(datum + ' ' + datum2)
    axios.post('http://localhost:3003/ischolar/delete-assigned-advisers',{
      data:{
				studno: datum,
				facid: datum2,
      }
    }).then(function(response){
      this.getAssignedAdvisers()
    }.bind(this))
  }

	render(){
		return(
			<div>
				<button onClick={this.addCo}> Add Assigned Adviser</button>

				<div>
					<table className="paper-table inputs">
						<tbody>
						<tr id="table-header">
							<th scope='col' className="other-col">Student Number</th>
							<th scope='col' className="other-col">Faculty ID</th>
							<th scope='col' className="other-col">Adviser Type</th>
						</tr>
						{this.state.table.map((data, index) =>{
							return (
								<tr key={index}>
									<td>{data.student_no}</td>
									<td>{data.faculty_id}</td>
									<td>{data.type}</td>
									  <td><button className="icon" onClick={() => {this.deleteAssigned(data.student_no, data.faculty_id)}}><img src={deleteButton} alt="delete icon" height="20px" /></button></td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>


			</div>
		)
	}

}

export default AssignedAdviser
