'use strict';

var views = require('co-views');
var parse = require('co-body');

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('mongodb://admin:admin@dharma.mongohq.com:10038/products');

// Wrap monk in generator goodness
var products = wrap(db.get('products'));

var render = views(__dirname + '/../views', {
    map: { html: 'swig' }
});

module.exports.home = function *home() {
    var productsList = yield products.find({});
    this.body = yield render('products', { 'products': productsList });
};
