const express = require('express');
const router = express.Router();
const currencyController = require('../../controller/bookthisorder/addcurrency');

// Create a new currency
router.post('/currencies', currencyController.createCurrency);

// Get all currencies
router.get('/currencies', currencyController.getCurrencies);

// Update a currency by ID
router.put('/currencies/:id', currencyController.updateCurrency);

// Delete a currency by ID
router.delete('/currencies/:id', currencyController.deleteCurrency);

module.exports = router;
