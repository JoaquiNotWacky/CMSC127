import React, {Component} from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Other.css'
import deleteButton from '../../assests/delete.png'

class Panel extends Component{
	constructor(props){
		super(props)
		autobind(this)
		this.state = {
			table: []
		}
	}

	componentDidMount(){
		this.getPanels();
	}

	getPanels(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-panels', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

	deletePanel(datum, datum2){
		axios.post('http://localhost:3003/ischolar/delete-panel',{
      data:{
        facid: datum,
				paperid: datum2
      }
    }).then(function(response){
      this.getPanels()
    }.bind(this))
	}

	render(){
		return(
			<div>
				<div>
					<table className="paper-table inputs">
						<tbody>
						<tr id="table-header">
							<th scope='col' className="other-col">Faculty ID</th>
							<th scope='col' className="other-col">Paper ID</th>
							<th scope='col' className="other-col">Location</th>
							<th scope='col' className="other-col">Panel Date</th>
						</tr>
						{this.state.table.map((data, index) =>{
							return (
								<tr key={index}>
									<td>{data.faculty_id}</td>
									<td>{data.paper_id}</td>
									<td>{data.location}</td>
									<td>{data.panel_date.slice(0,10)}</td>
									<td><button className="icon" onClick={() => {this.deletePanel(data.faculty_id, data.paper_id)}}><img src={deleteButton} alt="delete icon" height="20px" /></button></td>
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

export default Panel
