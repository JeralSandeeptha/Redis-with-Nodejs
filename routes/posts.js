const express = require('express');
const redis = require('redis');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: 'Get all posts server error',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: 'Get post server error',
            error: error.message
        });
    }
});

module.exports = router;