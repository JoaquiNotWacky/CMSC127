import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import deleteButton from '../../assests/delete.png'
import editButton from '../../assests/edit.png'
class AdviserTable extends Component {
  constructor(props){
    super(props);
    autobind(this);

    this.state = {
      table : [],
      search: '',
      input: 'facid',
    }
  }

  componentDidMount(){
    this.getAdvisers()
  }

	componentWillUnmount(){
		this.setState({table: []});
		console.log("lol")
	}

  getAdvisers(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-all-advisers', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

  deleteAdviser(datum){
    axios.post('http://localhost:3003/ischolar/delete-adviser',{
      data:{
        id: datum
      }
    }).then(function(response){
      this.getAdvisers()
    }.bind(this))
  }

	editAdviser(e){
		this.props.setAdviser(e);
		this.props.makeEdit();
	}

	searching(){
		console.log("searching")
		if(this.state.input === 'facid') {
			this.getAdviserByFacultyId(this.state.search);
		}else if(this.state.input === 'pos') this.getAdviserByPosition();
		else if(this.state.input === 'college') this.getAdviserByCollege();
		else if(this.state.input === 'dept') this.getAdviserByDepartment();
		else if(this.state.input === 'fname') this.getAdviserByFirstName();
		else if(this.state.input === 'mname') this.getAdviserByMiddleName();
		else if(this.state.input === 'lname') this.getAdviserByLastName();

	}

	getAdviserByMiddleName(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-middle-name', {
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

	getAdviserByFacultyId(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-faculty-id', {
			data:{
				facid: self.state.search,
			}
		})
		.then(function(response){
			self.setState({
				table: response.data
			}, console.log(response.data))
		})
	}

	getAdviserByLastName(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-last-name', {
			data:{
				lname: self.state.search,
			}
		})
		.then(function(response){
			self.setState({
				table: response.data
			}, console.log(response.data))
		})
	}
	getAdviserByPosition(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-faculty-position', {
			data:{
				pos: self.state.search,
			}
		})
		.then(function(response){
			self.setState({
				table: response.data
			}, console.log(response.data))
		})
	}

	getAdviserByDepartment(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-department', {
			data:{
			dept: self.state.search,
			}
		})
		.then(function(response){
			self.setState({
				table: response.data
			}, console.log(response.data))
		})
	}
	getAdviserByFirstName(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-first-name', {
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

	getAdviserByCollege(){
		const self = this;
		axios.post('http://localhost:3003/ischolar/get-adviser-by-college', {
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


	inputHandler(e){
		this.setState({input: e.target.value})
	}

	searchHandler(e){
		this.setState({search: e.target.value})
	}

  render() {
    return (
      <div >
        <input type="text" id="myInput" className="inputs" placeholder="Search" onChange={this.searchHandler}/>
        <select onChange={this.inputHandler}>
          <option value="facid">Faculty ID</option>
          <option value="pos">Faculty Position</option>
          <option value="college">College</option>
          <option value="dept">Depatment</option>
          <option value="fname">First Name</option>
          <option value="mname">Middle Name</option>
          <option value="lname">Last Name</option>
        </select>
        <button className="inputs main-button" onClick={this.searching}>SEARCH</button>
				  <button className="inputs main-button" onClick={this.getAdvisers}>REFRESH TABLE</button>
        <button id="add-adviser" className="inputs main-button" onClick={this.props.makeAdd}>ADD ADVISER</button>

        <div>
          <table className="adviser-table inputs">
            <tbody>
            <tr id="table-header">
              <th scope='col' id="faculty_id-col"> Faculty ID </th>
              <th scope='col' id="faculty_pos-col"> Faculty Position </th>
              <th scope='col' id="college-col"> College </th>
              <th scope='col' id="department-col"> Department </th>
              <th scope='col' id="fname-col"> First Name </th>
              <th scope='col' id="mname-col"> Middle Name </th>
              <th scope='col' id="lname-col"> Last Name </th>
            </tr>
            {this.state.table.map((data) =>{
              return (
                <tr key={data.faculty_id}>
                  <td>{data.faculty_id}</td>
                  <td>{data.faculty_position}</td>
									<td>{data.college}</td>
									<td>{data.department}</td>
                  <td>{data.f_name}</td>
                  <td>{data.m_name}</td>
                  <td>{data.l_name}</td>
                  <td><button className="icon" onClick={() => {this.deleteAdviser(data.faculty_id)}}><img src={deleteButton} alt="delete icon" height="20px" /></button></td>
                  <td><button className="icon" onClick={() => {this.editAdviser(data)}}><img src={editButton} alt="edit icon" height="15px" /></button></td>
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

export default AdviserTable;
