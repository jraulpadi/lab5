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

var mongoose = require('mongoose');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var prodSchema = new mongoose.Schema({
  idprod: Number,
  nomprod: String,
  cantidad: Number
});

var prod = mongoose.model('cat_producto', prodSchema);
var dltProd = mongoose.model('cat_producto', prodSchema);

  app.get('/api/v1/quehay', function (req, res) {
    
    //var prods = [];
    
    prod.find(function (err, prods) {
      if (err) return console.error(err);
      console.log(prods);
      res.send(prods);
    });    
  });
  
  app.get('/api/v1/:alguno', function (req, res) {
    prod.find({idprod: req.params.alguno}, function (err, prods) {
      if (err) return console.error(err);
      console.log(prods);
      res.send(prods);
    });    
      //res.send('entrando a api por get!');
    });
  

  app.post('/', function (req, res) {
    res.send('Got a POST request');
  });

  app.post('/api/v1/:algo', function (req, res) {   
    
    var fluffy = new prod(req.body);

    fluffy.save(function (err, fluffy) {
      if (err) return console.error(err);
      //res.send('ingresado en la base');
      res.send('Got a POST request con ' + req.params.algo);
    });
    
    console.log(req.body);
    //datageneral[req.params.algo] = req.body
    
  });
  
  app.put('/api/v1/:algo', function (req, res) {

    prod.findOneAndUpdate({ idprod: req.params.algo }, req.body, function(err, updProd) {
      if (err) throw err;
    
      // we have the updated user returned to us
      console.log(updProd);
      res.send('Updated el ' + req.params.algo);
    });    
  });
  
  app.delete('/api/v1/:algo', function (req, res) {
    
    prod.findOneAndRemove({ idprod: req.params.algo }, function(err) {
      if (err) throw err;    
          
      console.log('Producto ' + req.params.algo + ' Borrado.');
      res.send('Producto ' + req.params.algo + ' Borrado.');
      
    });
  });