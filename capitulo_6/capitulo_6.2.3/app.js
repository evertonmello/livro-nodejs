/**
 * @file capitulo_6/capitulo_6.1/app.js
 */

'use strict';
const express = require('express');
const path    = require('path');
const pug     = require('pug');
const debug   = require('debug')('livro_nodejs:app');
const app     = express();

// config
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', require('./routes'));

// errors handling
app.use(function(request, response, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, request, response, next) {
  response.status(err.status || 500).json({ err: err.message });
});

// server listener
module.exports = app;
