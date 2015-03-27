'use strict';

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var swig = require('swig');
var extras = require('swig-extras');
var app = module.exports = koa();

extras.useFilter(swig, 'truncate');

var products = require('./controllers/products');

// Logger
app.use(logger());

app.use(route.get('/products/:page', products.list));
app.use(route.get('/product/:title', products.get));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  var port = process.env.PORT || 3000;
  app.listen(port);

  console.log('listening on port 3000');
}
