'use strict'

const router	    = require(__dirname + '/routes/router');
const express       = require('express');
const body_parser   = require('body-parser');
const database = require(__dirname + '/lib/mysql');
const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// body parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Routes
const Router = require('./routes/router');
app.use('/ischolar', Router);

// Homepage message
app.get('/', (req, res) => {
  res.send('API is working!');
});

database.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3003 , (err) => {
  if (err) { console.log(err); }
  else { console.log('\nConnected to database'); }
});
