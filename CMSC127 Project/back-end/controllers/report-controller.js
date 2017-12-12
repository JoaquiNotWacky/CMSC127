const db = require(__dirname + '/../lib/mysql');

exports.reportOne = (req, res, next) =>{
	const data = {
		search: req.query.search_id
	}
  db.query('call getPapersAuthoredByAdviser(?)', [data.search], (err,result)=>{
    res.send(result);
		console.log(result)
  });
};


exports.reportTwo = (req, res, next) =>{
  const data ={
		search: req.query.search_id
	}
  db.query('call getPapersByTopic( ? )', [data.search], (err,result)=>{
    res.send(result);
  });
};

exports.reportThree = (req, res, next) =>{
  db.query('SELECT * FROM paper ORDER BY year', [], (err,result)=>{
    res.send(result);
  });
};

exports.reportFour = (req, res, next) =>{
  db.query('SELECT * FROM paper ORDER BY month', [], (err,result)=>{
    res.send(result);
  });
};

exports.reportFive = (req, res, next) =>{
  db.query('SELECT * FROM paper ORDER BY year, month', [], (err,result)=>{
    res.send(result);
  });
};

exports.reportSix = (req, res, next) =>{
  db.query('SELECT * FROM paper WHERE award = 1', [], (err,result)=>{
    res.send(result);
  });
};

exports.reportEight = (req, res, next) =>{
	const query_string = 'select paper.*, adviser.faculty_id, adviser.f_name, adviser.l_name from paper natural join adviser natural join panel'
  db.query(query_string, [], (err,result)=>{
    res.send(result);
		console.log(result)
  });
};

exports.reportSeven = (req, res, next) =>{
  db.query('', [], (err,result)=>{
    res.send(result);
  });
};
