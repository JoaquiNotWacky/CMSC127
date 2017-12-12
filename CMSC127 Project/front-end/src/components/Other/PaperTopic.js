import React, {Component} from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Other.css'

class PaperTopic extends Component{
	constructor(props){
		super(props)
		autobind(this)
		this.state = {
			table: []
		}
	}

	componentDidMount(){
		this.getPaperTopics();
		console.log("hello");
	}

	getPaperTopics(){
    const self = this;
    axios.get('http://localhost:3003/ischolar/get-paper-topics', {})
    .then(function(response){
      self.setState({
        table: response.data
      }, console.log(response.data))
    })
  }

	render(){
		return(
			<div>
				<div>
					<table className="paper-table inputs">
						<tbody>
						<tr id="table-header">
							<th scope='col' className="other-col"> Paper ID</th>
							<th scope='col' className="other-col"> Paper Topic</th>
						</tr>
						{this.state.table.map((data, index) =>{
							return (
								<tr key={index}>
									<td>{data.paper_id}</td>
									<td>{data.topic}</td>
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

export default PaperTopic
