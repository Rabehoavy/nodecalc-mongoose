﻿'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var form = require('./routes/form');
var calculatrice = require('./routes/calculatrice');
var resultat = require('./routes/resultat');
var technologie = require('./routes/technologie');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // Active la favicon indiquée

app.use('/', routes);
app.use('/users', users);
app.use('/form', form);
app.use('/calculatrice', calculatrice);
app.use('/resultat', resultat);
app.use('/technologie', technologie);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

// addition
//app.use(function (req, res) {
//    var addition = Number(req.body.nun) + Number(req.body.n2);
//    //var resultat = addition.toString();
//    res.render('resultat', {
//        result: 'addition'
//    });
//});

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});