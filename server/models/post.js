const Sequelize = require('sequelize');
const sequelize = require('../database');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING
    }
});

module.exports = Post;
