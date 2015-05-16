'use strict';

const 
    views = require('co-views'),
    monk = require('monk'),
    wrap = require('co-monk'),
    render = require('./../lib/render'),
    config = require('./../lib/config'),
    db = monk(config.getDatabaseUrl());

// Wrap monk in generator goodness
let products = wrap(db.get('products'));

module.exports.list = function *list(page) {
    let pageIndex = parseInt(page) - 1,
        result = yield products.find({}, { limit: config.itemsPerPage, skip: (pageIndex * config.itemsPerPage) });
    
    this.body = yield render('products', { 'products': result });
};

module.exports.find = function *find() {
    let result = yield products.find({ title: new RegExp(this.query.q) });
    throw new Error('teste');
    this.body = yield render('products', { 'products': result });
};

module.exports.get = function *get(title) {
    let product = yield products.findOne({ title: title });
    if (!product) {
        this.throw(404, 'product with title equal to ' + title + ' was not found');
    }

    this.body = yield render('product', { 'product': product });
};