const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./database');
const feedRoutes = require('./routes/feed');

const app = express();

//Body parser middleware.
app.use(bodyParser.json());

//Static folder for public assest.
app.use(express.static(path.join(__dirname, 'public')));

//CORS Headers
app.use((req, res ,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorisation');
    next();
});

//Routes
app.use('/feed', feedRoutes);

//Sync db and start server.
sequelize
    .sync()
    .then(result => {
        app.listen(3000, ()=> {
            console.log("Server up and running at http://localhost:3000");
        });
    })
    .catch(err => {
        console.log(err);
    });
