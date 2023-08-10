const express = require('express');
const router = express.Router();
const {
  createTopCurrency,
  getAllTopCurrencies,
  updateTopCurrency,
  deleteTopCurrency
} = require('../controller/topCurrency'); // Assuming the CRUD operations are defined in a separate controller file

// Create a new topCurrency
router.post('/', createTopCurrency);

// Get all topCurrencies
router.get('/', getAllTopCurrencies);

// Update a topCurrency by ID
router.put('/:id', updateTopCurrency);

// Delete a topCurrency by ID
router.delete('/:id', deleteTopCurrency);

module.exports = router;
