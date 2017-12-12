import React, { Component } from 'react';
import autobind from 'react-autobind'
import '../../css/Adviser.css';
import AdviserTable from './AdviserTable'
import AddAdviserForm from './AddAdviserForm'
import EditAdviserForm from './EditAdviserForm'
class Adviser extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
      display: 'table',
			adviser: '',
    }
  }

  display(){
    if(this.state.display === 'table'){
      return(<AdviserTable makeAdd={this.displayAdd} makeEdit={this.displayEdit} setAdviser={this.setAdviser}/>);
    } else if(this.state.display === 'add'){
      return(<AddAdviserForm makeTable={this.displayTable}/>);
    } else if(this.state.display === 'edit'){
      return(<EditAdviserForm makeTable={this.displayTable} theAdviser={this.state.adviser}/>);
    }
  }

  displayAdd(){
    this.setState({display: 'add'});
  }

  displayEdit(){
    this.setState({display: 'edit'});
  }

  displayTable(){
    this.setState({display: 'table'});
  }

	setAdviser(e){
    this.setState({adviser: e});
  }

  render() {
    return (
      <div className="adviser inner-content">
        {this.display()}
      </div>
    );
  }
}

export default Adviser;
