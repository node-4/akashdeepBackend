const express = require('express');
const router = express.Router();
const typeOfCurrencyController = require('../controller/typeOfcurrency');

// GET all currencies
router.get('/', typeOfCurrencyController.getAllCurrencies);

// GET a currency by ID
router.get('/:id', typeOfCurrencyController.getCurrencyById);

// CREATE a new currency
router.post('/', typeOfCurrencyController.createCurrency);

// UPDATE a currency by ID
router.put('/:id', typeOfCurrencyController.updateCurrency);

// DELETE a currency by ID
router.delete('/:id', typeOfCurrencyController.deleteCurrency);

module.exports = router;
