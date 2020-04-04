const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const feedController = require('../controllers/feed');

//GET feed/posts
router.get('/posts', feedController.getPosts);

//POST feed/post
router.post('/post', [
    body('content').trim().isLength({min: 1})
], feedController.createPost);

module.exports = router;