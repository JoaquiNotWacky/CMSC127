import React, { Component } from 'react';
import autobind from 'react-autobind'
import '../../css/Paper.css';
import PaperTable from './PaperTable'
import AddPaperForm from './AddPaperForm'
import EditPaperForm from './EditPaperForm'
import PanelAdd from '../Other/PanelAdd'
class Paper extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
      display: 'table',
			paper: '',
    }
  }

  display(){
    if(this.state.display === 'table'){
      return(<PaperTable makeAdd={this.displayAdd} makePanel={this.displayPanel} makeEdit={this.displayEdit} setPaper={this.setPaper}/>);
    }
		else if(this.state.display === 'add'){
       return(<AddPaperForm makeTable={this.displayTable}/>);
     } else if(this.state.display === 'edit'){
       return(<EditPaperForm makeTable={this.displayTable} thePaper={this.state.paper}/>);
     } else if(this.state.display === 'panel'){
       return(<PanelAdd makeTable={this.displayTable} thePaper={this.state.paper}/>);
     }
  }

  displayAdd(){
    this.setState({display: 'add'});
  }

  displayPanel(){
    this.setState({display: 'panel'});
  }

  displayEdit(){
    this.setState({display: 'edit'});
  }

  displayTable(){
    this.setState({display: 'table'});
  }

	setPaper(e){
    this.setState({paper: e});
  }

  render() {
    return (
      <div className="student inner-content">
        {this.display()}
      </div>
    );
  }
}

export default Paper;
