var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//cors
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatbotRouter = require('./routes/chatbot');

var app = express();
// chatbotdb
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());


var url = "mongodb://localhost:27017/chatbotdb";
// mongodb+srv://sk:<password>@cluster0-elylp.mongodb.net/test?retryWrites=true&w=majority
const CONNECTION_URL = "mongodb+srv://sk:project0751@cluster0-elylp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "chatbotdb";

// app.listen(3100, () => {
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log(error);
    throw error;
  }
  database = client.db(DATABASE_NAME);
  collection = database.collection("all");
  console.log("Connected to `" + DATABASE_NAME + "`!");
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chatbot', chatbotRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
