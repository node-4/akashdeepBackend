const express = require('express');
const router = express.Router();
const betterRateController = require('../controller/requestbetterrate');

// Route for creating a new better rate order
router.post('/betterRates', betterRateController.createBetterRate);

// Route for getting all better rate orders
router.get('/betterRates', betterRateController.getAllBetterRates);

// Route for updating an existing better rate order
router.put('/betterRates/:betterRateId', betterRateController.updateBetterRate);

// Route for deleting an existing better rate order
router.delete('/betterRates/:betterRateId', betterRateController.deleteBetterRate);
router.get('/convertRate/:currency/:forexAmount', betterRateController.convertRate);
router.post('/webhooks', betterRateController.webhooks);


module.exports = router;
