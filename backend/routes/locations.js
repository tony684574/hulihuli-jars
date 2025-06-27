const express = require('express');
const router = express.Router();
const {
    getAllLocations,
    addLocation
} = require('../controllers/locationsController');

router.get('/', getAllLocations);
router.post('/', addLocation);

module.exports = router;