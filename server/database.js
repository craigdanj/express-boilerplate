const Sequelize = require('sequelize');

//Connect to the db
//You can swap out SQLite with any SQL databse supported by sequelize
const sequelize = new Sequelize('db', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './db.sqlite',
	operatorsAliases: 0
});

//Test the connection
sequelize
	.authenticate()
	.then(() => {
        console.log('- Database connection has been established successfully.\n');
	})
	.catch(err => {
		console.error('- Unable to connect to the database:', err);
    });

module.exports = sequelize;
