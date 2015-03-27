'use strict';

var config = require('./../lib/config');
var views = require('co-views');

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.getDatabaseUrl());

// Wrap monk in generator goodness
var productsCollection = wrap(db.get('products'));

var render = views(__dirname + '/../views', {
    map: { html: 'swig' }
});

module.exports.list = function *list(page) {
  var pageIndex = parseInt(page) - 1;
  var products = yield productsCollection.find({ }, { limit: config.itemsPerPage, skip: (pageIndex * config.itemsPerPage) });
  this.body = yield render('products', { 'products': products });
};

module.exports.get = function *get(title) {
    var product = yield productsCollection.findOne({ title: title });
        
    if (!product) {
        this.throw(404, 'product with title equal to ' + title + ' was not found');
    }

    this.body = yield render('product', { 'product': product });
};