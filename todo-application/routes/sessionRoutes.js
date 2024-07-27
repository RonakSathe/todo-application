const express = require('express');
const { getSessionDetails,verifyToken } = require('../controllers/sessionController');

const router = express.Router();

router.get('/sessions', verifyToken, getSessionDetails);

module.exports = router;
