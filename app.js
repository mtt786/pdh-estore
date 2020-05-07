var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const cors = require('cors');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(error, request, response, next) {
    console.log("Error handler: ", error);

    // Send an error message to the user.
    response.status(error.status || 500).json({error:error.message});

});

module.exports = app;
