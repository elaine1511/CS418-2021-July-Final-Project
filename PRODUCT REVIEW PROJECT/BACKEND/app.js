var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;

var usersRouter = require('./routes/users');
const productRouter=require('./routes/products');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to database
app.use((req, res, next) => {
  console.log('DB is connected...');
  const url = 'mongodb+srv://elaine:1511@cluster0.xsmkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      db = client.db('productreview');
      req.db = db;
      next();
    })
    .catch(err => {
      console.log('Error: ', err);
    });
});

app.use('/', usersRouter);
app.use('/product',productRouter);


app.get('/', (req, res) => {
  res.send('WELCOME TO OUR PRODUCT REVIEW APPLICATION');
});



// catch 404 
app.use(function (req, res, next) {
  res.status(404).send('Page not found');
});


app.listen(3000,()=>{
  console.log('server is running');
})