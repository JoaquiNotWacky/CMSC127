import React, { Component } from 'react';
import autobind from 'react-autobind'
import axios from 'axios';
import '../../css/Form.css'
import PaperTopicForm from './PaperTopicForm'
class AddPaperForm extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			table: [],
			status: '',
			title: '',
			classification: '',
			field: '',
			award: '',
			year: '',
			month: '',
			student_no: '',
			canAdd: '',
			list_topics: [],
    }
  }

	componentDidMount(){
		this.getStudent()
	}

	getStudent(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-all-students', {})
		.then(function(response){
			self.setState({
				table: response.data
			})
		})
	}

	setTopics(new_topics){
		const self = this;
		self.setState({list_topics: new_topics});
		console.log(this.state.list_topics);
	}

	getMaxId(){
		const self = this;
		axios.get('http://localhost:3003/ischolar/get-max-paper-id', {})
		.then(function(response){
			self.addPaperTopics(response.data[0])
		})
	}

	addPaperTopics(id){
		var n = 0;
		const self = this;
		while(n < self.state.list_topics.length){
			console.log(self.state.list_topics[n]);
			axios.post('http://localhost:3003/ischolar/insert-paper-topic', {
				data :{
					paper_id: id.id,
					topic: self.state.list_topics[n],
				}
			})
			.then(function(response){
			})
			n++;
		}
	}

	addPaper(){
		const self = this;

		axios.post('http://localhost:3003/ischolar/insert-paper',{
			data:{
				studno: this.state.student_no,
				status: this.state.status,
				title: this.state.title,
				field: this.state.field,
				classification: this.state.classification,
				award: this.state.award,
				year: this.state.year,
				month: this.state.month,
			}
		})
		.then(function(response){
			self.getMaxId()
		})
		this.props.makeTable()
	}

	titleHandler(e){
		this.setState({title: e.target.value})
	}

	fieldHandler(e){
		this.setState({field: e.target.value})
	}

	classificationHandler(e){
		this.setState({classification: e.target.value, status: ''})
	}

	statusHandler(e){
		this.setState({status: e.target.value})
	}

	awardHandler(e){
		this.setState({award: e.target.value})
	}

	dateHandler(e){
		this.setState({year: e.target.value.slice(0,4), month: e.target.value.slice(5, 7)})
	}

	studentNoHandler(e){
		this.setState({student_no: e.target.value})
	}

	statusDropdown(){
		if(this.state.classification === ''){
			return(<select className="inputFields"><option></option></select>);
		} else if (this.state.classification === 'Thesis'){
			return(
								<select onChange={this.statusHandler} className="inputFields">
									{this.state.status === '' ? <option></option>: ''}
									<option value="Thesis 1">Thesis 1</option>
									<option value="Thesis 2">Thesis 2</option>
									<option value="Approved">Approved</option>
								</select>
							)
		} else if(this.state.classification === 'SP'){
				return(
								<select onChange={this.statusHandler} className="inputFields">
									{this.state.status === '' ? <option></option>: ''}
									<option value="SP 1">SP 1</option>
									<option value="SP 2">SP 2</option>
									<option value="Approved">Approved</option>
								</select>
							)
		}
	}

  render() {
    return (
      <div>
        <button onClick={this.props.makeTable} className="cancel main-button">CANCEL</button>

        <form className="mainForm">

          <label>Title</label>
          <br/>
          <input type="text" className="inputFields" placeholder="Title"  maxLength="140" onChange={this.titleHandler}/>
					<br/>

					<label>Classification</label>
					<br/>
					<select onChange={this.classificationHandler} className="inputFields">
						{this.state.classification === '' ? <option></option>: ''}
						<option value="Thesis">Thesis</option>
						<option value="SP">Special Problem</option>
					</select>
					<br/>
					<label>Status</label>
					<br/>
						{this.statusDropdown()}
					<br/>

					<label>Field</label>
					<br/>
					<input type="text" className="inputFields" placeholder="Field"  maxLength="50" onChange={this.fieldHandler}/>
					<br/>

					<label>Won Best Thesis/SP</label> <br/>
					<input  type="radio"  name="award" value="1" onChange={this.awardHandler}/>YES<br/>
					<input  type="radio" name="award" value="0" onChange={this.awardHandler}/>NO<br/>

					<br/>
					<label>Year and Month</label>
					 <input onChange={this.dateHandler} className="inputFields" type="month"/>
				 <br/>

				 <label>Student Number</label>
				 <select  className="inputFields list_stud" onChange={this.studentNoHandler}>
					 {this.state.student_no === '' ? <option>Choose Student</option>: ''}
						 {this.state.table.map((stud) =>{
							 return (<option key={stud.student_no}
							 value={stud.student_no}>{stud.student_no} - {stud.l_name}, {stud.f_name}</option>)
						 })}
					 </select>


					<button type="button" className="add-button" disabled={this.canAdd} onClick={this.addPaper}>Adding Paper</button>

        </form>
				<PaperTopicForm setTopics={this.setTopics}/>
      </div>
    );
  }

}


export default AddPaperForm;
