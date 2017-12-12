'use strict'

const db = require(__dirname + '/../lib/mysql');

exports.insertCoAuthor= (req, res, next) =>{
  const data = {
    facid: req.body.data.facid,
    paperid:req.body.data.paperid
  };

	console.log(data.facid + ' ' + data.paperid)
  const query_string = 'INSERT INTO co_author VALUES (?, ?)';
  db.query(query_string, [data.facid, data.paperid], (err, result) => {
		res.send(result);
		console.log(result)
	});
}

exports.deleteCoAuthor = (req, res, next) => {
  const data = {
    paperid: req.body.data.paperid,
    facid: req.body.data.facid

  };
	console.log(data.paperid, data.facid)
  const query_string = ('call deleteCoAuthor(?, ?)');

	db.query(query_string, [data.paperid, data.facid], (err, result) => {
	res.send(result);
	console.log(result)
});
}

exports.getCoAuthors = (req, res, next) => {
	db.query('SELECT * from co_author', [], (err, result)=>{
		res.send(result)
	})
}
