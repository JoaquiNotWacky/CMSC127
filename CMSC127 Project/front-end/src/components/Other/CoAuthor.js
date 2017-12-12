import React, {Component} from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Other.css'
import deleteButton from '../../assests/delete.png'

class CoAuthor extends Component{
	constructor(props){
		super(props)
		autobind(this)
		this.state = {
			table: []
		}
	}

	componentDidMount(){
		this.getCoAuthors();
	}

	deleteAdviser(datum, datum2){
    axios.post('http://localhost:3003/ischolar/delete-coauthor',{
      data:{
        facid: datum,
				paperid: datum2
      }
    }).then(function(response){
      this.getCoAuthors()
    }.bind(this))
  }

	getCoAuthors(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-co-authors', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

	addCo(){
		location.href='/co'
	}

	render(){
		return(
			<div>
				<div>
					<button onClick={this.addCo}> Add CoAuthor</button>
					<table className="paper-table inputs">
						<tbody>
						<tr id="table-header">
							<th scope='col' className="other-col">Paper ID</th>
							<th scope='col' className="other-col">Faculty ID</th>
						</tr>
						{this.state.table.map((data, index) =>{
							return (
								<tr key={index}>
									<td>{data.paper_id}</td>
									<td>{data.faculty_id}</td>
									      <td><button className="icon" onClick={() => {this.deleteAdviser(data.faculty_id, data.paper_id)}}><img src={deleteButton} alt="delete icon" height="20px" /></button></td>
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

export default CoAuthor
