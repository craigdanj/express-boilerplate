const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
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

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed. Length too short.',
            errors: errors.array()
        })
    }

    Post.create({ content: req.body.content })
        .then(post => {
            res.status(201).json({
                data: [
                    {
                        message: "Post created successfully",
                        post: {
                            id: post.dataValues.id,
                            content: post.dataValues.content
                        }
                    }
                ]
            });
        })
        .catch( err => {
            console.log(err);
        });

};
