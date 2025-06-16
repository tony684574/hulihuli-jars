const express = require('express');
const router = express.Router();
const { getAllJars } = require('../controllers/jarsController');

router.get('/', getAllJars);

module.exports = router;