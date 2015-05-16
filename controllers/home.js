'use strict';

module.exports.index = function *index() {
    yield this.redirect('/products/1');
};