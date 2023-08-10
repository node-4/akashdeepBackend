const express = require('express');
const router = express.Router();
const alertController = require('../controller/setanalert');

// Create a new alert
router.post('/alerts', alertController.createAlert);

// Get all alerts
router.get('/alerts', alertController.getAllAlerts);

// Update an existing alert
router.put('/alerts/:alertId', alertController.updateAlert);

// Delete an existing alert
router.delete('/alerts/:alertId', alertController.deleteAlert);

module.exports = router;
