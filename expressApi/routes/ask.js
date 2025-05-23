const express = require('express');
const router = express.Router();
const { handleAsk } = require('../controllers/ask.controller');

router.post('/', handleAsk);

module.exports = router;
