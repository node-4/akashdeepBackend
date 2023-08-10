const express = require('express');
const router = express.Router();
const remittanceController = require('../controller/remittance'); // Replace the path to the remittance controller with your actual file path

// Create a new remittance
router.post('/remittances', remittanceController.createRemittance);

// Get all remittances
router.get('/remittances', remittanceController.getAllRemittances);

// Update a remittance by ID
router.put('/remittances/:id', remittanceController.updateRemittanceById);

// Delete a remittance by ID
router.delete('/remittances/:id', remittanceController.deleteRemittanceById);

module.exports = router;
