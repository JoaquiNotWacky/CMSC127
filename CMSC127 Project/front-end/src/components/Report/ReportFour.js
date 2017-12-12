import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';

class ReportFour extends Component {
  constructor(props){
    super(props);
    autobind(this);

    this.state = {
      table : [],
    }
  }

  componentDidMount(){
    this.getReportFour()
  }

	componentWillUnmount(){
		this.setState({table: []});
		console.log("lol")
	}

	getReportFour(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-report-four', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

  render() {
    return (
      <div >

								<div>
				          <table className="paper-table inputs">
				            <tbody>
				            <tr id="table-header">
				              <th scope='col' id="paper_id-col"> Paper ID</th>
				              <th scope='col' id="title-col"> Title </th>
				              <th scope='col' id="title-col"> Field </th>
				              <th scope='col' id="class-col"> Classification </th>
											<th scope='col' id="status-col"> Status</th>
				              <th scope='col' id="award-col"> Award </th>
				              <th scope='col' id="year-col"> Year </th>
				              <th scope='col' id="month-col"> Month </th>
				              <th scope='col' id="student_no-col"> Student Number </th>
				            </tr>
				            {this.state.table.map((data) =>{
				              return (
				                <tr key={data.paper_id}>
													<td>{data.paper_id}</td>
								          <td>{data.title}</td>
								          <td>{data.field}</td>
								          <td>{data.classification}</td>
													<td>{data.status}</td>
								          <td>{data.award === 1 ? 'YES': 'NO'}</td>
								          <td>{data.year}</td>
								          <td>{data.month}</td>
								          <td>{data.student_no}</td>
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

export default ReportFour;
