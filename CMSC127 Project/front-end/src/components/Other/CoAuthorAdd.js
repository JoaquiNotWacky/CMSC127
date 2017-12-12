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
			papers: [],
			choosen_adviser: '',
			choosen_paper: '',
		}
	}

	componentDidMount(){
		this.getAdvisers();
		this.getPapers();
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

		paperHandler(e){
			this.setState({choosen_paper: e.target.value});
		}

		getPapers(){
			const self = this;
			axios.get('http://localhost:3003/ischolar/get-all-papers', {})
			.then(function(response){
				self.setState({
					papers: response.data
				}, console.log(response.data))
			})
		}

		addCoAuthor(){
			const self = this;
			console.log(self.state.choosen_paper + self.state.choosen_adviser)
			axios.post('http://localhost:3003/ischolar/insert-coauthor',{
				data:{
					paperid: self.state.choosen_paper,
					facid: self.state.choosen_adviser,
				}
			})
			.then(function(response){
				console.log(response.data)
			})
			location.href = '/coauthor'
		}

		back(){
			location.href= '/coauthor'
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

				<select  className="inputFields list_stud" onChange={this.paperHandler}>
					{this.state.choosen_paper === '' ? <option>Choose Paper</option>: ''}
						{this.state.papers.map((ad) =>{
							return (<option key={ad.paper_id}
							value={ad.paper_id}>{ad.paper_id} - {ad.title} - {ad.classification}</option>)
						})}
					</select>

					<button onClick={this.addCoAuthor}>Add CoAuthor</button>
			</div>
		)
	}

}

export default CoAuthor
