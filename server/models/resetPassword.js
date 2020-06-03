const Sequelize = require('sequelize');
const sequelize = require('../database');

const ResetPassword = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = ResetPassword;
