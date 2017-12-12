import React, { Component } from 'react';
import autobind from 'react-autobind'
import deleteButton from '../../assests/delete.png'
import axios from 'axios'
class PanelAdd extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			id: 0,
  		paper_id: this.props.thePaper.paper_id,
			advisers: [],
			adviser_list: [],
			location: '',
			panel_date: ''
    }
  }

	componentDidMount(){
		while(this.state.id < 3){
			this.addAdviser();
		}
	}

	addAdviser(){
		const self = this
		const new_advisers = this.state.advisers
		const new_advisers_list = this.state.adviser_list
		new_advisers.push(self.state.id+'ID')
		new_advisers_list.push('')
		const new_id = ++this.state.id;

		self.setState({topics: new_advisers, adviser_list: new_advisers_list, id: new_id})
	}

	deleteAdviser(index){
		const self = this
		const new_advisers = this.state.advisers
		const new_advisers_list = this.state.adviser_list
		new_advisers.splice(index, 1)
		new_advisers_list.splice(index, 1)
		self.setState({topics: new_advisers, adviser_list: new_advisers_list})
	}

	locationHandler(e){
		this.setState({location: e.target.value})
	}

	changeAdviser(index, value){
		const self = this
		const new_advisers = this.state.adviser_list
		new_advisers[index] = value
		self.setState({adviser_list: new_advisers})
	}

	dateHandler(e){
		this.setState({panel_date: e.target.value})
	}


	addPanel(){
		var n =0;
		while(n < this.state.adviser_list.length){
			axios.post('http://localhost:3003/ischolar/insert-panel',{
				data:{
					facid: this.state.adviser_list[n],
					paperid: this.state.paper_id,
					loc: this.state.location,
					pdate: this.state.panel_date,
				}
			})
			.then(function(response){
			})
			this.props.makeTable()
			n++;
		}
	}

  render() {
    return (
      <div>
				<button onClick={this.props.makeTable} className="cancel main-button">CANCEL</button> <br/>
					<hr/>
				<button onClick={() => {this.addAdviser()}}>New Panelist</button>
				{this.state.advisers.map((top,index) =>{
					return(<Advisers delete={this.deleteAdviser} currIndex={index} key={top} changeAdviser={this.changeAdviser}/>);
				})}
				<label>Location</label>
				<br/>
				<input type="text" className="inputFields" placeholder="Location"  maxLength="50" onChange={this.locationHandler}/>
				<br/>
				<label>Date</label>
				 <input onChange={this.dateHandler} className="inputFields" type="date"/>
			 <br/>
			 {this.state.panel_date}
				<button onClick={this.addPanel}>Add Panel</button>
      </div>
    );
  }
}


class Advisers extends Component{
	constructor(props){
		super(props);
		autobind(this)
		this.state = {
			adviser: [],
			chosen_adviser: '',
		}
	}

	componentDidMount(){
		this.getAdvisers()
	}

	getAdvisers(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-all-advisers', {})
		.then(function(response){
			self.setState({
				adviser: response.data
			}, console.log(response.data))
		})
	}

	changeHandler(e){
		this.setState({chosen_adviser: e.target.value}, this.props.changeAdviser(this.props.currIndex, e.target.value))
	}

	render(){
		return(
		<div>
			<select  className="inputFields list_stud" onChange={this.changeHandler}>
				{this.state.chosen_adviser === '' ? <option>Choose Panelist</option>: ''}
					{this.state.adviser.map((ad) =>{
						return (<option key={ad.faculty_id}
						value={ad.faculty_id}>{ad.faculty_id} - {ad.l_name}, {ad.f_name}</option>)
					})}
				</select>
				{this.props.currIndex >= 3 ?
					<button className="icon" onClick={()=> {this.props.delete(this.props.currIndex)}}> <img src={deleteButton} alt="delete icon" height="20px"/> </button>
					: ''
				}
		</div>
	)
	}
}

export default PanelAdd;
