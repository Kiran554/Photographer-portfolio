'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const compression = require('compression');

const app = express();

app.use(compression());  
app.use(express.static('src'));  
app.use(favicon(path.join(__dirname,'src','favicon.ico')));

app.get('*', function(req, res) {  
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.message = '404: File Not Found';
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render(err.message || 'Error!!!');
});

module.exports = app;