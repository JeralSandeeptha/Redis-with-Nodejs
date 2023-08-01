const express = require('express');
const redis = require('redis');      ///import redis package
const util = require('util');
const axios = require('axios');

const router = express.Router();

//create redis client
const redisClient = redis.createClient('redis://127.0.0.1:6379');

//create a util
redisClient.set = util.promisify(redisClient.set);

// Add event handlers to handle errors and make sure the client is ready before use
redisClient.on('error', (error) => {
    console.error('Redis client error:', error);
});
redisClient.on('ready', () => {
    console.log('Redis client is ready');
});

router.get('/', async (req, res) => {
    try {

        const cachedPosts = await redisClient.get('posts');

        if (cachedPosts) {
            return res.status(200).json({
                message: 'Get all posts query successful',
                cache: 'Used cache memory data',
                data: JSON.parse(cachedPosts)
            });
        }else {
            const responseAPI = await axios.get('https://jsonplaceholder.typicode.com/posts');

            const posts = responseAPI.data;

            await redisClient.set('posts', JSON.stringify(posts));

            res.status(200).json({
                message: 'Get all posts query successful',
                cache: 'Set data to cache memory',
                data: posts
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Get all posts server error',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {

        const cachedPost = await redisClient.get(`post-${id}`);

        if (cachedPost) {
            return res.status(200).json({
                message: 'Get post query successful',
                cache: 'Used cache memory data',
                data: JSON.parse(cachedPost)
            });
        }else {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);

            const post = response.data;

            await redisClient.set('posts', JSON.stringify(post));

            res.status(200).json({
                message: 'Get post query successful',
                cache: 'Set data to cache memory',
                data: post
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Get post server error',
            error: error.message
        });
    }
});

module.exports = router;