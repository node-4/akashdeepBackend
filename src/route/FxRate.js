
const express = require('express');
const router = express.Router();
const currencyController = require('../controller/Fxrate');

// router.post('/convert', currencyController.convertCurrency);

// Create a new resource
router.post('/', currencyController.createFxRate);

// // Get all resources
// router.get('/', currencyController.findAll);

// // Get a specific resource by ID
// router.get('/:id', currencyController.findOne);

// // Update a specific resource by ID
// router.put('/:id', currencyController.update);

// // Delete a specific resource by ID
// router.delete('/:id', currencyController.delete);

module.exports = router;