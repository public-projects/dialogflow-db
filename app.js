var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//cors
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
    console.log("error = ");
    console.log(error);

    throw error;
  }
  console.log("after.... ");
  database = client.db(DATABASE_NAME);
  collection = database.collection("all");
  console.log("Connected to `" + DATABASE_NAME + "`!");
});

app.get("/chatbot/test", (request, response) => {
  console.log("/chatbot/test server!");
  response.send('testing nod server!');
});

app.get("/chatbot/del", (request, response) => {
  console.log("/chatbot/del server!");
  database.collection("all").deleteMany({});
  response.send('deleting!');
});

app.post("/chatbot/find", (request, response) => {
  console.log("/chatbot/find server!");
  console.log("request.question = " + request.body.question);
  // console.log( request);

  // collection.findOne({ "question": "how do you feel?" }, (error, result) => {
  collection.findOne({ "question": request.body.question }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.post("/chatbot/update", (request, response) => {
  console.log("/chatbot/update server!");
  // console.log("request.question = " + request.body.question);
  console.log( 'request = ');
  console.log( request.body.question);
  console.log( request.body.answer);

  // collection.findOne({ "question": "how do you feel?" }, (error, result) => {
  collection.insertOne({ "question": request.body.question, "answer": request.body.answer }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
