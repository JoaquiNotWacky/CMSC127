'use strict'
const db = require(__dirname + '/../lib/mysql');

exports.insertStudent =(req, res, next) =>{
  const query_string = 'INSERT INTO student VALUES (?, ?, ?, upper(?), upper(?), upper(?))';
  db.query(query_string, [req.body.data.studno, req.body.data.course, req.body.data.college, req.body.data.fname, req.body.data.mname, req.body.data.lname], (err, result) => {
		res.send(result);
  });
};

exports.updateStudent=(req, res, next) => {
  const query_string = 'call updateStudent(?, ?, ?, upper(?), upper(?), upper(?))';
  db.query(query_string, [req.body.data.studno, req.body.data.course,req.body.data.college, req.body.data.fname, req.body.data.mname, req.body.data.lname], (err, result) => {
    res.send(result);
    console.log(result);
  });
};

exports.getAllStudents =(req, res, next) =>{
  db.query('SELECT * FROM student', [], (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getAllStudentNumbers =(req, res, next) =>{
  db.query('SELECT student_no FROM student', [], (err,result)=>{
    res.send(result);
  });
};

exports.getStudentByStudentNumber = (req, res, next) => {
	db.query('SELECT * from student where student_no = ?', [req.body.data.studno], (err, result)=>{
		res.send(result);
		console.log(result)
	});
};

exports.getStudentByCourse =(req, res, next) => {
	db.query('SELECT * from student where course = ?', [req.body.data.course], (err, result)=>{
		res.send(result);
		console.log(result)
	});
};

exports.getStudentByCollege =(req, res, next) => {
	db.query('SELECT * from student where college = ?', [req.body.data.college], (err, result)=>{
		res.send(result);
		console.log(result)
	});
};

exports.getStudentByFirstName =(req, res, next) => {
	db.query('SELECT * from student where f_name = upper(?)', [req.body.data.fname], (err, result)=>{
		res.send(result);
		console.log(result)
	});
};

exports.getStudentByMiddleName = (req, res, next) => {
	db.query('SELECT * from student where m_name = upper(?)', [req.body.data.mname], (err, result)=>{
		res.send(result);
		console.log(result)
	});
};

exports.getStudentByLastName = (req, res, next) => {
	db.query('SELECT * from student where l_name = upper(?)', [req.body.data.lname], (err, result)=>{
		res.send(result);
		console.log(result)
	});
};

exports.deleteStudent=(req, res, next) => {
  const data = {
    studno: req.body.data.studno,
  };
  console.log(data.studno)
  const query_string = 'call deleteStudent(?)';

  db.query(query_string, [data.studno], (err, result) => {
	   res.send(result)
  });
};
