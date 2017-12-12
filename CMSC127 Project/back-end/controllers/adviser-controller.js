const db = require(__dirname + '/../lib/mysql');


exports.insertAdviser = (req, res, next) => {
  const data = {
    id: req.body.data.id,
    pos: req.body.data.pos,
		college: req.body.data.college,
    dept: req.body.data.dept,
    fname: req.body.data.fname,
    mname: req.body.data.mname,
    lname: req.body.data.lname,
  };
  const query_string = 'INSERT INTO adviser VALUES (?, ?, ?, ?, upper(?), upper(?), upper(?))';
  db.query(query_string, [data.id, data.pos, data.dept, data.college, data.fname, data.mname, data.lname], (err, result) =>{
    res.send(result);
  });
};

exports.updateAdviser = (req, res, next) => {
  const data = {
    id: req.body.data.id,
    pos: req.body.data.pos,
		college: req.body.data.college,
    dept: req.body.data.dept,
    fname: req.body.data.fname,
    mname: req.body.data.mname,
    lname: req.body.data.lname,
  };
  const query_string = 'CALL  updateAdviser (?, ?, ?, ?, upper(?), upper(?), upper(?))';
  db.query(query_string, [data.id, data.pos, data.college, data.dept, data.fname, data.mname, data.lname], (err, result) =>{
    res.send(result);
  });
};

exports.deleteAdviser = (req, res, next) => {
	const data = {
		id: req.body.data.id,
	};
  db.query('CALL deleteAdviser( ? )', [data.id], (err, result) =>{
    res.send(result);
    console.log(result);
  });
};


exports.getAllAdvisers = (req, res, next) =>{
  db.query('SELECT * FROM adviser', [], (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.getAllFacultyId = (req, res, next) =>{
  db.query('SELECT faculty_id FROM adviser', [], (err,result)=>{
    res.send(result);
    console.log(result);
  });
};

exports.searchIdAdviser = (req, res, next) =>{
  const search = req.body.data.facid
  db.query('SELECT * FROM adviser WHERE faculty_id = ?', [search], (err,result)=>{
    res.send(result);
  });
};

exports.searchCollegeAdviser = (req, res, next) =>{
  const search = req.body.data.college
  db.query('SELECT * FROM adviser WHERE faculty_id = ?', [search], (err,result)=>{
    res.send(result);
  });
};

exports.searchPositionAdviser = (req, res, next) =>{
  const search = req.body.data.pos
  db.query('SELECT * FROM adviser WHERE faculty_position = ?', [search], (err,result)=>{
    res.send(result);
  });
};

exports.searchDeptAdviser = (req, res, next) =>{
  const search = req.body.data.dept
  db.query('SELECT * FROM adviser WHERE department = ?', [search], (err,result)=>{
    res.send(result);
  });
};

exports.searchFnameAdviser = (req, res, next) =>{
  const search = req.body.data.fname
  db.query('SELECT * FROM adviser WHERE f_name = ?', [search], (err,result)=>{
    res.send(result);
  });
};

exports.searchMnameAdviser = (req, res, next) =>{
  const search = req.body.data.mname
  db.query('SELECT * FROM adviser WHERE m_name = ?', [search], (err,result)=>{
    res.send(result);
  });
};

exports.searchLnameAdviser = (req, res, next) =>{
  const search = req.body.data.lname
  db.query('SELECT * FROM adviser WHERE l_name = ?', [search], (err,result)=>{
    res.send(result);
  });
};
