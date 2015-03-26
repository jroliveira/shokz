'use strict';

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

var products = require('./controllers/products');

// Logger
app.use(logger());

app.use(route.get('/', products.home));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  var port = process.env.PORT || 3000;
  app.listen(port);

  console.log('listening on port 3000');
}