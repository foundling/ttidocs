var sqlite3 = require('sqlite3');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('ttidocs','','', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '../db/ttidocs.sqlite3'
});

var Article = sequelize.define('article', {
    // e.g., Syrinx
    tech_type: {
        type: Sequelize.STRING,
        field: 'tech_type'
    },
    // e.g., Build Process
    category: {
        type: Sequelize.STRING,
        field: 'category'
    },
    // e.g., Grunt Tasks
    title: {
        type: Sequelize.STRING,
        field: 'article_title'
    },

},
{});
