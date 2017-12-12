'use strict'

const db = require(__dirname + '/../lib/mysql');

exports.insertPaperTopic = (req, res, next) =>{
  const data = {
  topic: req.body.data.topic,
	paper_id: req.body.data.paper_id
	};

	console.log(data.paper_id)

  const query_string = 'INSERT INTO paper_topic VALUES (?, upper(?))';
  db.query(query_string, [data.paper_id, data.topic], (err, result) => {
		res.send(result);
	});
};

exports.deletePaperTopic = (req, res, next) => {
  const data = {
    paper_id: req.body.data.paper_id,
    topic: req.body.data.topic,

  };
  const query_string = ('call deletePaperTopic(?, upper(?))');
  db.query(query_string, [data.paper_id, data.topic], (err, result) => {
	res.send(result);
  });
};

exports.getPaperTopics = (req, res, next) =>{
	db.query("SELECT * from paper_topic", [], (err,result)=>{
		res.send(result);
	})
}

exports.getTopicByPaper = (req, res, next) =>{
	db.query("CALL getTopicByPaper (?)", [req.query.paper_id], (err,result)=>{
		res.send(result);
		console.log(result)
	})
}
