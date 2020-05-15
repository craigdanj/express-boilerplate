const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER, //0 - inactive, 1 - active, 2 - deleted
        allowNull: true
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: true
    }    
});

module.exports = User;
