const express = require('express');
const router = express.Router();

const { 
    addInventoryMovement,
    getInventorySummary,
    disperseInventoryToLocation,
    getActiveInventoryByLocation
} = require('../controllers/inventoryController');

router.post('/', addInventoryMovement);
router.get('/summary', getInventorySummary);
router.post('/disperse/:location_id', disperseInventoryToLocation);
router.get('/active/:location_id', getActiveInventoryByLocation)

module.exports = router;