// const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    //Check if user exists.
    User.findOne({ where: {email} }).then(user => {
        if(user) {
            res.status(500).json({
                error: "A user with the email id provided already exists"
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

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser = null;
    User.findOne({ where: {email} }).then(user => {
        if (user) {
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        } else {
            //invalid login.
            const error = new Error("invalid credentials");
            error.statusCode = 500;
            throw error;
        }
    }).then(isEqual => {
        if(!isEqual) {
            const error = new Error("invalid credentials");
            error.statusCode = 500;
            throw error;
        }

        console.log('-------------------')
        console.log(loadedUser.get('id'));
        console.log(loadedUser.get('email'));

        const token = jwt.sign({
            email: loadedUser.get('email'),
            id: loadedUser.get('id')
        }, 'thisisasecretsecretkeyohyeah',
        {
            expiresIn: '2h'
        });

        res.status(200).json({
            token,
            userId: loadedUser.get('id')
        });

    })
    .catch( err => {

        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
