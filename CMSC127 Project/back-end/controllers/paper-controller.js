'use strict'

const db = require(__dirname + '/../lib/mysql');

exports.insertPaper=(req, res, next) => {
  const query_string = 'INSERT INTO paper VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query_string, [req.body.data.status, req.body.data.title, req.body.data.classification, req.body.data.field, req.body.data.award, req.body.data.year, req.body.data.month, req.body.data.studno], (err, result) => {
		res.send(result)
		console.log(result)
  });
};

exports.updatePaper=(req, res, next) => {
  const data ={
		paper_id: req.body.data.paper_id,
    status: req.body.data.status,
    title: req.body.data.title,
    classification: req.body.data.classification,
    field: req.body.data.field,
    award: req.body.data.award,
    year: req.body.data.year,
    month: req.body.data.month,
    studno:req.body.data.studno
  };
	console.log(data.title)
  const query_string = 'call updatePaper(?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query_string, [data.paper_id, data.status, data.title, data.classification, data.field, data.award, data.year, data.month, data.studno], (err, result) => {
		res.send(result)
		console.log(result)
  });
};

exports.deletePaper=(req, res, next) => {
  const query_string = 'call deletePaper(?)';
    db.query(query_string, [req.body.data.paperid], (err, result) => {
	   res.send(result);
  });
};

exports.getAllPapers = (req, res, next) =>{
  db.query('SELECT * FROM paper', [], (err,result)=>{
    res.send(result);
  });
};

exports.getMaxId = (req, res, next) =>{
	db.query('SELECT max(paper_id) as id from paper', [], (err,result)=>{
		res.send(result)
	})
}
