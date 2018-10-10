var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

module.exports = app;

datageneral = [];


  app.get('/', function (req, res) {
    res.send('Hello World!');
  });
  
  app.get('/api/v1', function (req, res) {
      datos = {};
      datos.campoid = 1;
      datos.campodesc = 'Primer campo';
  
      res.send(datageneral);
      //res.send('entrando a api por get!');
    });
  

  app.post('/', function (req, res) {
    res.send('Got a POST request');
  });

  app.post('/api/v1/:algo', function (req, res) {
    res.send('Got a POST request con ' + req.params.algo);
    console.log(req.body);
    datageneral[req.params.algo] = req.body
    
  });
  
  app.put('/api/v1/:algo', function (req, res) {
    res.send('Got a PUT request at /user');
  });
  
  app.delete('/api/v1/:algo', function (req, res) {
    res.send('Got a DELETE request at /user');
  });