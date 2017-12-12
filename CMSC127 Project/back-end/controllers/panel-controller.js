'use strict'

const db = require(__dirname + '/../lib/mysql');

exports.insertPanel = (req, res, next) =>{
  const data = {
    facid: req.body.data.facid,
    paperid: req.body.data.paperid,
    loc: req.body.data.loc,
    pdate: req.body.data.pdate

  };
  const query_string = 'INSERT INTO panel VALUES (?, ?, ?, ?)';
  db.query(query_string, [data.facid, data.paperid, data.loc, data.pdate], (err, result) => {
		res.send(result);
		console.log(result)
	});
};

exports.deletePanel = (req, res, next) =>{
  const data = {
    facid: req.body.data.facid,
    paperid: req.body.data.paperid,

  };
  const query_string = 'call deletePanel(?, ?)';
  db.query(query_string, [data.paperid, data.facid], (err, result) => {
		res.send(result);
		console.log(result)
	});
};


exports.getPanels = (req, res, next) => {
	db.query('SELECT * from panel', [], (err, result)=>{
		res.send(result)

	})
}
