const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    User.findOne({ where: {email} }).then(user => {
        if(user) {
            res.status(500).json({
                error: "User already exists"
            });
        } else {
            //Create user
            User.create({ name, email, password }).then(user => {
                if(user) {
                    res.status(200).json({
                        email: user.name
                    });
                } else {
                    res.status(500).json({
                        error: "could not create user"
                    });
                }
                
            }).catch(err => {
            });

            
        }        
    });
};

exports.getUsers = (req, res, next) => {
    User.findAndCountAll()
        .then(users => {
            const userRows = users.rows;
            const total = users.count;

            res.status(200).json({
                users: userRows,
                total
            });
        })
        .catch( err => {
            console.log(err);
        });
};
