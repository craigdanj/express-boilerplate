// const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    //Check if user exists.
    User.findOne({ where: {email} }).then(user => {
        if(user) {
            res.status(500).json({
                error: "User already exists"
            });
        } else {
            //Hash password
            bcrypt.hash(password, 12).then(hashedPassword => {

                //Create user
                User.create({
                    name,
                    email,
                    password: hashedPassword
                }).then(user => {
                    if (user) {
                        res.status(200).json({
                            message: `User ${email} created successfully`
                        });
                    } else {
                        res.status(500).json({
                            error: "Could not create user"
                        });
                    }
                }).catch(err => {
                    if(!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });

            }).catch(err => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
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
