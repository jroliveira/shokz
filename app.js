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

require('./lib/string-format');

require('koa-qs')(app);
extras.useFilter(swig, 'truncate');

// Logger
app.use(logger());

let products = require('./controllers/products'),
    setup = require('./controllers/setup'),
    home = require('./controllers/home');

app.use(route.get('/products/:page', products.list));
app.use(route.get('/products', products.find));
app.use(route.get('/product/:title', products.get));
app.use(route.get('/setup', setup.index));
app.use(route.get('/', home.index));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

// custom 404
app.use(function *(next) {
    yield next;
    if (this.body || !this.idempotent) 
        return;
    this.redirect('404');
});

// look ma, error propagation!
app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        // some errors will have .status
        // however this is not a guarantee
        this.status = err.status || 500;
        this.type = 'html';
        this.body = yield render('404');

        // since we handled this manually we'll
        // want to delegate to the regular app
        // level error handling as well so that
        // centralized still functions correctly.
        this.app.emit('error', err, this);
    }
});

// error handler
app.on('error', function (err) {
    if (process.env.NODE_ENV != 'test') {
        console.log('sent error %s to the cloud', err.message);
        console.log(err);
    }
});

if (!module.parent) {
    let port = process.env.PORT || 3000;
    app.listen(port);

    console.log('listening on port 3000');
}