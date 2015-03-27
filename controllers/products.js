'use strict';

var config = require('./../lib/config');
var views = require('co-views');
//var parse = require('co-body'); //TODO: We are not using is parse D:

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.getDatabaseUrl());

// Wrap monk in generator goodness
var productsCollection = wrap(db.get('products'));

var render = views(__dirname + '/../views', {
    map: { html: 'swig' }
});

module.exports.home = function *home() {
    var products = yield productsCollection.find({});
    this.body = yield render('products', { 'products': products });
};
