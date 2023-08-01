const express = require('express');
const redis = require('redis');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

        const posts = response.data;

        res.status(200).json({
            message: 'Get all posts query successful',
            data: posts
        });

    } catch (error) {
        res.status(500).json({
            message: 'Get all posts server error',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);

        const post = response.data;

        res.status(200).json({
            message: 'Get post query successful',
            data: post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Get post server error',
            error: error.message
        });
    }
});

module.exports = router;