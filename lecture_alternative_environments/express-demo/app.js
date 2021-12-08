var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const SimpleLog = require('./simple_log');

const db = new SimpleLog('db.json');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/load', (req, res) => {
    res.send(db.value);
});
app.post('/submit', (req, res) => {
    db.push(req.body);
    res.send({data: 'success'});
});

module.exports = app;
