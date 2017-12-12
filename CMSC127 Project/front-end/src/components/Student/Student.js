import React, { Component } from 'react';
import autobind from 'react-autobind'
import '../../css/Student.css';
import StudentTable from './StudentTable'
import AddStudentForm from './AddStudentForm'
import EditStudentForm from './EditStudentForm'
import ViewStudent from './ViewStudent'
class Student extends Component {
  constructor(props){
    super(props);
    autobind(this)
    this.state = {
      display: 'table',
			student: '',
    }
  }

  display(){
    if(this.state.display === 'table'){
      return(<StudentTable makeAdd={this.displayAdd} makeView={this.displayView} makeEdit={this.displayEdit} setStudent={this.setStudent}/>);
    } else if(this.state.display === 'add'){
      return(<AddStudentForm makeTable={this.displayTable}/>);
    } else if(this.state.display === 'edit'){
      return(<EditStudentForm makeTable={this.displayTable} theStudent={this.state.student}/>);
    } else if(this.state.display === 'view'){
      return(<ViewStudent makeTable={this.displayTable} theStudent={this.state.student}/>);
    }
  }

  displayAdd(){
    this.setState({display: 'add'});
  }

  displayView(){
    this.setState({display: 'view'});
  }

  displayEdit(){
    this.setState({display: 'edit'});
  }

  displayTable(){
    this.setState({display: 'table'});
  }

	setStudent(e){
    this.setState({student: e});
  }

  render() {
    return (
      <div className="student inner-content">
        {this.display()}
      </div>
    );
  }
}

export default Student;
