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

module.exports.list = function* list(page) {
  let pageIndex = parseInt(page) - 1;
  
  let options = { 
    limit: config.itemsPerPage, 
    skip: (pageIndex * config.itemsPerPage) 
  };
  
  let result = yield products.find({}, options);

  this.body = yield render('products', { 'products': result });
};

module.exports.find = function* find() {
  let where = {
    title: new RegExp(this.query.q)
  };

  let result = yield products.find(where);

  this.body = yield render('products', { 'products': result });
};

module.exports.get = function* get(title) {
  let where = { 
    title: title 
  };
  
  let product = yield products.findOne(where);

  if (!product) {
    throw new Error(404, 'product with title equal to ' + title + ' was not found');
  }

  this.body = yield render('product', { 'product': product });
};