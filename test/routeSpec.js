/*global describe, it*/
'use strict';

var superagent = require('supertest');
var app = require('../app');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /products/1', function () {
    it('should return 200', function (done) {
      request()
        .get('/products/1')
        .expect(200, done);
    });
  });

  describe('GET /product/turtle-shell-racers', function () {
    it('should return 200', function (done) {
      request()
        .get('/product/turtle-shell-racers')
        .expect(200, done);
    });
  });

  describe('GET /product/notfound', function () {
    it('should return 404', function (done) {
      request()
        .get('/product/notfound')
        .expect(404, done);
    });
  });
});