'use strict';

var views = require('co-views');
var parse = require('co-body');
    
var products = [
    { id: 1, name: 'Game Of Thrones 3D Map Puzzle', price: 43.72, img: 'images/game-of-thrones-cityscape-3d-puzzle.jpg' },
    { id: 2, name: 'Super Mario Bros Chess Board', price: 34.99, img: 'images/super-mario-chess-board.jpg' },
    { id: 3, name: 'Archeress Leather Quiver', price: 130.00, img: 'images/archeress-leather-quiver.jpg' },
    { id: 4, name: 'World Of Warcraft Horde Armory Chest', price: 550.00, img: 'images/warcraft-horde-chest.jpg' },
    { id: 5, name: 'Turtle Shell Racers', price: 245.10, img: 'images/turtle-shell-racers.jpg' }
    
];

var render = views(__dirname + '/../views', {
    map: { html: 'swig' }
});

module.exports.home = function *home() {
    this.body = yield render('products', { 'products': products });
};