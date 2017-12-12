'use strict'

const db = require(__dirname + '/../lib/mysql');


exports.insertAssignedAdviser=(req, res, next) =>{
  const data = {
    studno: req.body.data.studno,
    facid:req.body.data.facid,
    type:req.body.data.type
  };

  const query_string = 'INSERT INTO assigned_adviser VALUES (?, ?, ?)';
  db.query(query_string, [data.studno, data.facid, data.type], (err, result) => {
		res.send(result);
		console.log(result)
	});
};

exports.deleteAssignedAdviser=(req, res, next) => {
  const data = {
    studno: req.body.data.studno,
    facid: req.body.data.facid

  };

	console.log(data.studno + ' ' + data.facid)
  const query_string = ('call deleteAssignedAdviser(?, ?)');
  db.query(query_string, [data.studno, data.facid], (err, result) => {
	res.send(result);
	console.log(result)
});
};


exports.getAssignedAdvisers = (req, res, next) =>{
	db.query("SELECT * from assigned_adviser", [], (err,result)=>{
		res.send(result);
	})
}
