'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const compression = require('compression');

const app = express();

app.use(compression());  
app.use(express.static('src'));  
app.use(favicon(path.join(__dirname,'src','favicon.ico')));


module.exports = app;