import React, { Component } from 'react';
import autobind from 'react-autobind'
import deleteButton from '../../assests/delete.png'
import '../../css/PaperTopicForm.css'
class PaperTopicForm extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
			id: 0,
  		paper_id: '',
			topics: [],
			topics_list: [],
    }
  }

	componentDidMount(){
		console.log("hello");
	}

	addTopic(){
		const self = this
		const new_topics = this.state.topics
		const new_topics_list = this.state.topics_list
		new_topics.push(self.state.id+'ID')
		new_topics_list.push('')
		const new_id = ++this.state.id;

		self.setState({topics: new_topics, topics_list: new_topics_list, id: new_id}, this.props.setTopics(new_topics_list))
	}

	deleteTopic(index){
		const self = this
		const new_topics = this.state.topics
		const new_topics_list = this.state.topics_list
		new_topics.splice(index, 1)
		new_topics_list.splice(index, 1)
		self.setState({topics: new_topics, topics_list: new_topics_list}, this.props.setTopics(new_topics_list))
	}

	changeTopic(index, value){
		const self = this
		const new_topics = this.state.topics_list
		new_topics[index] = value
		self.setState({topics_list: new_topics}, this.props.setTopics(new_topics))
	}

  render() {
    return (
      <div className="inner-right-content">
				<button onClick={() => {this.addTopic()}}>New Topic</button>
				{this.state.topics.map((top,index) =>{
					return(<Topic delete={this.deleteTopic} currIndex={index} key={top} changeTopic={this.changeTopic}/>);
				})}
      </div>
    );
  }
}


class Topic extends Component{
	constructor(props){
		super(props);
		autobind(this)
		this.state = {
			topic: '',
		}
	}

	changeHandler(e){
		this.setState({topic: e.target.value}, this.props.changeTopic(this.props.currIndex, e.target.value))
	}

	render(){
		return(
		<div>
			  <input type="text" className="topic" placeholder="Topic"  maxLength="20" onChange={this.changeHandler}/>
			<button className="icon" onClick={()=> {this.props.delete(this.props.currIndex)}}> <img src={deleteButton} alt="delete icon" height="20px"/> </button>
		</div>
	)
	}
}

export default PaperTopicForm;
