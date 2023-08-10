const express = require('express');
const router = express.Router();
const {
  createCurrencyConverter,
  getAllCurrencyConverters,
  updateCurrencyConverter,
  deleteCurrencyConverter
} = require('../controller/currencyconverter'); // Assuming the CRUD operations are defined in a separate controller file

// Create a new CurrencyConverter
router.post('/', createCurrencyConverter);

// Get all CurrencyConverters
router.get('/', getAllCurrencyConverters);

// Update a CurrencyConverter by ID
router.put('/:id', updateCurrencyConverter);

// Delete a CurrencyConverter by ID
router.delete('/:id', deleteCurrencyConverter);

module.exports = router;
