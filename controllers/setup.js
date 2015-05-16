'use strict';

const
    monk = require('monk'),
    wrap = require('co-monk'),
    config = require('./../lib/config'),
    db = monk(config.getDatabaseUrl());

// Wrap monk in generator goodness
var products = wrap(db.get('products'));

module.exports.index = function *index() {
    products.drop(function () {
        products.insert([
            {
                name: 'Game Of Thrones 3D Map Puzzle',
                title: 'game-of-thrones-3d-map-puzzle',
                price: 43.72,
                img: '/images/game-of-thrones-cityscape-3d-puzzle.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.',
                tags: ['games', 'geek'],
                wishes: 5
            },
            {
                name: 'Super Mario Bros Chess Board',
                title: 'super-mario-bros-chess-board',
                price: 34.99,
                img: '/images/super-mario-chess-board.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.',
                tags: ['games', 'sport', 'cool'],
                wishes: 14
            },
            {
                name: 'Archeress Leather Quiver',
                title: 'archeress-leather-quiver',
                price: 130.00,
                img: '/images/archeress-leather-quiver.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.',
                tags: ['games', 'figure arts'],
                wishes: 43
            },
            {
                name: 'World Of Warcraft Horde Armory Chest',
                title: 'world-of-warcraft-horde-armory-chest',
                price: 550.00,
                img: '/images/warcraft-horde-chest.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.',
                tags: ['figure arts'],
                wishes: 29
            },
            {
                name: 'Turtle Shell Racers',
                title: 'turtle-shell-racers',
                price: 245.10,
                img: '/images/turtle-shell-racers.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.',
                tags: ['sport', 'geek', 'series'],
                wishes: 1057
            }
        ]);
    });

    yield this.body = 'OK';
};