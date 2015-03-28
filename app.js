'use strict';

const 
    compress = require('koa-compress'),
    logger = require('koa-logger'),
    serve = require('koa-static'),
    route = require('koa-route'),
    koa = require('koa'),
    path = require('path'),
    swig = require('swig'),
    extras = require('swig-extras'),
    app = module.exports = koa();

require('koa-qs')(app);
extras.useFilter(swig, 'truncate');

var products = require('./controllers/products');

// Logger
app.use(logger());

app.use(route.get('/products/:page', products.list));
app.use(route.get('/products', products.find));
app.use(route.get('/product/:title', products.get));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
    let port = process.env.PORT || 3000;
    app.listen(port);

    console.log('listening on port 3000');
}