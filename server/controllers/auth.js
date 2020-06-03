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

exports.forgotPasword = (req, res, next) => {
    const email = req.body.email;
    if (email) {
        //Check if user exists.
        User.findOne({ where: {email} }).then(user => {
            //We always send a success because we dont want malicious users to be able to detect whether an email they've enetered is registered with our system.
            res.status(200).json({
                message: 'An email is sent to your email id'
            });

            if (user) {
                return user.id;
            } else {

            }
        }).then(userId => {
            console.log(userId);
            //If token already exists for user delete existing token.
            //Generate and store token in resetPassword table along with expiry date.

            //Send email with a link to the reset password page with the token in the url.

        });
    } else {
        res.status(500).json({
            message: 'no email supplied'
        });
    }

};


exports.resetPasword = (req, res, next) => {
    const token = req.body.token;

    //When reset password is called check to see if token expired. If yes fail. Else update password in user table.


    //When reset password is called check to see if token expired. If yes fail. Else update password in user table.
};