import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import deleteButton from '../../assests/delete.png'
import editButton from '../../assests/edit.png'
class PaperTable extends Component {
  constructor(props){
    super(props);
    autobind(this);

    this.state = {
      table : [],
      search: '',
      input: '',
    }
  }

  componentDidMount(){
    this.getPapers()
  }

	componentWillUnmount(){
		const self = this;
		self.setState({table: []});

	}

	getPapers(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-all-papers', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

  deletePaper(datum){
    axios.post('http://localhost:3003/ischolar/delete-paper',{
      data:{
        paperid: datum
      }
    }).then(function(response){
      this.getPapers()
    }.bind(this))
  }

	editPaper(e){
		this.props.setPaper(e);
		this.props.makeEdit();
	}

	panelPaper(e){
		this.props.setPaper(e);
		this.props.makePanel();
	}

  render() {
    return (
      <div >
        <input type="text" id="myInput" className="inputs" placeholder="Search"/>
        <select>
          <option>Paper ID</option>
          <option>Title</option>
          <option>Classification</option>
					<option>Status</option>
					<option>Field</option>
          <option>Award</option>
          <option>Year</option>
          <option>Month</option>
          <option>Student Number</option>
        </select>
        <button className="inputs main-button">SEARCH</button>
        <button id="add-paper" className="inputs main-button" onClick={this.props.makeAdd}>ADD PAPER</button>

        <div>
          <table className="paper-table inputs">
            <tbody>
            <tr id="table-header">
              <th scope='col' id="paper_id-col"> Paper ID</th>
              <th scope='col' id="title-col"> Title </th>
              <th scope='col' id="class-col"> Classification </th>
							<th scope='col' id="status-col"> Status</th>
              <th scope='col' id="title-col"> Field </th>
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
				          <td>{data.classification}</td>
									<td>{data.status}</td>
				          <td>{data.field}</td>
				          <td>{data.award === 1 ? 'YES': 'NO'}</td>
				          <td>{data.year}</td>
				          <td>{data.month}</td>
				          <td>{data.student_no}</td>
                  <td><button className="icon" onClick={() => {this.deletePaper(data.paper_id)}}><img src={deleteButton} alt="delete icon" height="20px" /></button></td>
                  <td><button className="icon" onClick={() => {this.editPaper(data)}}><img src={editButton} alt="edit icon" height="15px" /></button></td>
									<td><button onClick={()=> {this.panelPaper(data)}}>Panel Paper</button></td>
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

export default PaperTable;
