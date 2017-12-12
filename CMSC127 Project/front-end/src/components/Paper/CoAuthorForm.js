import React, { Component } from 'react';
import autobind from 'react-autobind'
import deleteButton from '../../assests/delete.png'
import '../../css/PaperTopicForm.css'
class CoAuthorForm extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			id: 0,
			advisers: [],
			adviser_list: [],
    }
  }

	deleteCoAuthor(index){
		const self = this
		const new_adviser = this.state.advisers
		new_adviser.splice(index, 1)
		self.setState({advisers: new_adviser})
	}


	addCoAuthor(){
		const self = this
		const new_adviser = this.state.advisers
		new_adviser.push(self.state.id+'ID')
		const new_id = ++this.state.id;

		self.setState({advisers: new_adviser, id: new_id})
	}

  render() {
    return (
      <div className="inner-right-content">
				<button onClick={() => {this.addCoAuthor()}}>New CoAuthor</button>
				{this.state.advisers.map((top,index) =>{
					return(<CoAuthor currIndex={index} key={top} delete={this.deleteCoAuthor} table={this.state.adviser_list}/>);
				})}
      </div>
    );
  }
}


class CoAuthor extends Component{
	constructor(props){
		super(props);
		autobind(this)
		this.state = {
			adviser_list: this.props.table,
			choosen_adviser: '',
		}
	}

	changeHandler(e){
		this.setState({topic: e.target.value}, this.props.changeTopic(this.props.currIndex, e.target.value))
	}

	render(){
		return(
		<div>
			<select  className="topic" onChange={this.adviserHandler}>
				{this.state.choosen_adviser === '' ? <option>Choose CoAuthor</option>: ''}
					{this.state.adviser_list.map((ad) =>{
						return (<option key={ad.faculty_id}
						value={ad.faculty_id}>{ad.faculty_id} - {ad.l_name}, {ad.f_name}</option>)
					})}
				</select>

			<button className="icon" onClick={()=> {this.props.delete(this.props.currIndex)}}> <img src={deleteButton} alt="delete icon" height="20px"/> </button>
		</div>
	)
	}
}

export default CoAuthorForm;
