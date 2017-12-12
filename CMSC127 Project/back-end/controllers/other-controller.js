'use strict'
const db = require(__dirname + '/../lib/mysql');

exports.getColleges =(req, res, next) =>{
  db.query('SELECT distinct(college), id,college_shortcut FROM course_college group by college', [], (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getCourses =(req, res, next) =>{
  db.query('SELECT id, course, college FROM course_college',[] , (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getDeptColleges =(req, res, next) =>{
  db.query('SELECT distinct(college), id FROM department_college group by college', [], (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getDistinctTopics =(req, res, next) =>{
  db.query('SELECT distinct(topic), paper_id FROM paper_topic group by topic', [], (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getDepartments =(req, res, next) =>{
  db.query('SELECT id, department, college FROM department_college',[] , (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getFacultyPositions =(req, res, next) =>{
  db.query('SELECT id, faculty_pos FROM faculty_position',[] , (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getPapersByStudent =(req, res, next) =>{
	const data = {
		search: req.query.search
	}
	console.log(data.search)

  db.query('CALL getPaperByStudent(?)',[data.search] , (err,result)=>{
    res.send(result);
    console.log(result);
  });
};
