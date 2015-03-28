'use strict';

const 
    views = require('co-views'),
    monk = require('monk'),
    wrap = require('co-monk'),
    config = require('./../lib/config'),
    db = monk(config.getDatabaseUrl());

// Wrap monk in generator goodness
var productsCollection = wrap(db.get('products')),
    render = views(__dirname + '/../views', {
        map: { html: 'swig' }
    });

module.exports.list = function* list(page) {
    let pageIndex = parseInt(page) - 1,
        products = yield productsCollection.find({}, { limit: config.itemsPerPage, skip: (pageIndex * config.itemsPerPage) });
    
    this.body = yield render('products', { 'products': products });
};

module.exports.find = function* find() {
    let products = yield productsCollection.find({ title: new RegExp(this.query.q) });

    this.body = yield render('products', { 'products': products });
};

module.exports.get = function* get(title) {
    let product = yield productsCollection.findOne({ title: title });
    if (!product) {
        this.throw(404, 'product with title equal to ' + title + ' was not found');
    }

    this.body = yield render('product', { 'product': product });
};