'use strict';

/**
 * Module dependencies.
 */

let views = require('co-views');

// setup views mapping .html
// to the swig template engine

module.exports = views('{0}/../views'.format(__dirname), {
  map: {
    html: 'swig'
  }
});